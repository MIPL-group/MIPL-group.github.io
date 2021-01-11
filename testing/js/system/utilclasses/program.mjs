import Xpath from "./xpath.mjs";
import {Action, ActionType} from "./action.mjs";
import {xpath_agree_without_one_offset} from "./xpathCompare.mjs";
import {IterState, ProgramExecutor} from "../systems/programExecutor.mjs";
import Trace from "./trace.mjs";

const ProgramUnitType = {
    Click: 0,
    Sendkey: 1,
    ForEach: 2,
    GoBack : 4
}

/**
// Program Unit:
//     ProgramUnit:= Click(xpath)|
//         Sendkey(xpath,value)|
//         ForEach(parameters)|
//         GoBack
//
// Parameter usage:
//
//     ProgramUnitType.Click: click [xpath]
// ProgramUnitType.Sendkey: sendkey [xpath] [value]
// ProgramUnitType.ForEach: foreach [label] in children([xpath],[nodename],[index],[offset],[time]){[program]}
// ProgramUnitType.GoBack:  goback
 */

class ProgramUnit{
    constructor(unit_type, ...args) {
        this.unit_type = unit_type
        this.parameters = []
        for(let arg of args){
            this.parameters.push(arg)
        }
        if(this.unit_type === ProgramUnitType.Click ||
            this.unit_type === ProgramUnitType.Sendkey)
        {
            if(typeof this.parameters[0] === "string"){
                this.parameters[0] = new Xpath(this.parameters[0])
            }
            return
        }
        if(this.unit_type === ProgramUnitType.ForEach)
        {
            if(typeof this.parameters[1] === "string"){
                this.parameters[1] = new Xpath(this.parameters[1])
            }
        }
    }

    toString(offset = 0){
        let indent = ""
        for(let i = 0; i < offset; i++){
            indent += "  "
        }
        switch(this.unit_type){
            case ProgramUnitType.Click:
                return indent + "click " + this.parameters[0].toString()
            case ProgramUnitType.Sendkey:
                return indent +"sendkey " + this.parameters[0].toString() + " " + this.parameters[1].toString()
            case ProgramUnitType.ForEach:
                return indent+"foreach " + this.parameters[0] +" in children(" + this.parameters[1].toString() + ", " + this.parameters[2] + ", "
            +this.parameters[3] + ", " + this.parameters[4]+", "+this.parameters[5] + ") do {\n"+
                    this.parameters[6].toString(offset+2)+ indent +"}"
            case ProgramUnitType.GoBack:
                return indent+ "goback"
        }
    }

    to_action(){
        switch(this.unit_type){
            case ProgramUnitType.Click:
            case ProgramUnitType.Sendkey:
            case ProgramUnitType.GoBack:
                return new Action(this.toString())
        }
        return new Action("")
    }

    agree_with_offset(other_program_unit) {
        if (this.unit_type === other_program_unit.unit_type) {
            if (this.unit_type === ProgramUnitType.Click || this.unit_type === ProgramUnitType.Sendkey) {
                return xpath_agree_without_one_offset(this.parameters[0], other_program_unit.parameters[0])
            }
            if (this.unit_type === ProgramUnitType.ForEach) {
                return this.parameters[0] === other_program_unit.parameters[0]
                    && this.parameters[2] === other_program_unit.parameters[2]
                    && this.parameters[3] === other_program_unit.parameters[3]
                    && this.parameters[4] === other_program_unit.parameters[4]
                    && this.parameters[5] === other_program_unit.parameters[5]
                    && this.parameters[6].toString() === other_program_unit.parameters[6].toString()
                    && xpath_agree_without_one_offset(this.parameters[1], other_program_unit.parameters[1])
            } else {
                return {result: false}
            }
        } else {
            return {result: false}
        }
    }


    equals(other_program_unit){
        if(this.unit_type === other_program_unit.unit_type &&
            this.parameters.length === other_program_unit.parameters.length)
        {
            for(let i = 0; i < this.parameters.length; ++i)
            {
                if(this.parameters[i].toString() === other_program_unit.parameters[i].toString())
                {
                    continue;
                }
                else
                {
                    return false
                }
            }
            return true
        }
        {
            return false;
        }
    }

    get xpath(){
        if(this.unit_type === ProgramUnitType.Click || this.unit_type === ProgramUnitType.Sendkey)
        {
            return this.parameters[0]
        }
        else if(this.unit_type === ProgramUnitType.ForEach)
        {
            return this.parameters[1]
        }
        else
        {
            return new Xpath("")
        }
    }

    set xpath(new_xpath) {
        if (this.unit_type === ProgramUnitType.Click || this.unit_type === ProgramUnitType.Sendkey) {
            this.parameters[0] = new_xpath
        } else if(this.unit_type === ProgramUnitType.ForEach)
        {
            return this.parameters[1] = new_xpath
        }
    }

    get length(){
        if(this.unit_type === ProgramUnitType.Click || this.unit_type === ProgramUnitType.Sendkey
            ||this.unit_type === ProgramUnitType.GoBack)
        {
            return 1
        }

        if(this.unit_type === ProgramUnitType.ForEach){
            return 1+this.parameters[6].length
        }
    }
}

class Program{
    constructor(trace = null) {
        this.content = []
        this.prediction = null
        this.last_for_index = null
        if(!trace)
        {
            return
        }
        else
        {
            this.construct_from_trace(trace)
        }
    }

    append_unit(program_unit){
        this.prediction = null
        this.content.push(program_unit)
        if(program_unit.unit_type === ProgramUnitType.ForEach){
            this.last_for_index = this.content.length-1
        }
    }

    toString(offset = 0){
        let result = ""
        for(let unit of this.content){
            result += unit.toString(offset) + "\n"
        }
        return result
    }

    construct_from_trace(trace) {
        for(let action of trace.action_list){
            switch (action.action_type) {
                case ActionType.GoBack:
                    this.append_unit(new ProgramUnit(ProgramUnitType.GoBack))
                    break;
                case ActionType.Click:
                    this.append_unit(new ProgramUnit(ProgramUnitType.Click,action.parameters[0]))
                    break;
                case ActionType.Sendkey:
                    this.append_unit(new ProgramUnit(ProgramUnitType.Sendkey,action.parameters[0],action.parameters[1]))
                    break;

            }
        }
    }
    //get a copy of program [start,end)
    get_subprogram(start, end=this.content.length){
        let result = new Program()
        for(let i = start; i < end; ++i){
            result.append_unit(this.content[i])
        }
        return result

    }

    //get length for the program. For the for instruction, it will expand the content
    get length(){
        let result = 0
        for(let item of this.content)
        {
            result += item.length
        }
        return result
    }

    get size(){
        return this.content.length
    }

    //TODO: can be optimized
    make_prediction(){
        if(this.prediction !== null)
        {
            return this.prediction
        }
        if(this.last_for_index=== null){
            this.prediction = new Trace()
            return this.prediction
        }
        //get last for loop
        let last_for_loop = this.get_subprogram(this.last_for_index,this.last_for_index+1).content[0]
        let last_for_loop_body = last_for_loop.parameters[6]
        let last_for_loop_iter_status = new IterState(last_for_loop.parameters[0],last_for_loop.parameters[1],
            last_for_loop.parameters[2],last_for_loop.parameters[3],last_for_loop.parameters[4],last_for_loop.parameters[5]+1)//here, one more executing time
        last_for_loop_iter_status.cur_num = last_for_loop.parameters[5]
        //run one more extra_time and get trace
        let executor = new ProgramExecutor()
        executor.load_program(last_for_loop_body,last_for_loop_iter_status)
        let extended_trace_part = executor.execute_program()
        //now, compare the executing result
        let i = 0, j = 0;
        for(i = this.last_for_index+1, j = 0; i < this.content.length; ++i,++j){
            let action_1 = extended_trace_part.action_list[j]
            let action_2 = this.content[i].to_action()
            if(!(action_1.action_type === action_2.action_type && action_1.xpath.strict_equals(action_2.xpath)))
            {
                this.prediction = new Trace()
                return this.prediction
            }
        }
        //if there's something left for the extended for loop, then it is predictable in this stage.
        if(extended_trace_part.action_list.length - j> 0)
        {
            let trace = new Trace()
            for(let k = j; k < extended_trace_part.action_list.length; ++k)
            {
                trace.append_action(extended_trace_part.action_list[k])
            }
            this.prediction = trace
            return this.prediction
        }
    }
}

export {ProgramUnitType,ProgramUnit,Program}
