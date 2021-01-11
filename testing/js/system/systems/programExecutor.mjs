import Xpath from "../utilclasses/xpath.mjs";
import Node from "../utilclasses/node.mjs";
import {ProgramUnitType} from "../utilclasses/program.mjs";
import {Action} from "../utilclasses/action.mjs";
import Trace from "../utilclasses/trace.mjs";
import {ActionType} from "../utilclasses/action.mjs";

class IterState{
    constructor(iter_label, iter_xpath, iter_nodename, base, offset, num) {
        this.iter_label = iter_label
        this.iter_xpath = iter_xpath
        this.iter_nodename = iter_nodename
        this.iter_base = base
        this.iter_offset = offset
        this.iter_num = num
        this.cur_num = 0
    }

    fit(xpath_to_fit){
        if(xpath_to_fit.node_list[0].is_label && xpath_to_fit.node_list[0].name === this.iter_label)
        {
            let new_xpath = new Xpath()
            new_xpath.node_list = new_xpath.node_list.concat(this.iter_xpath.node_list)
            new_xpath.node_list.push(new Node(this.iter_nodename+"["+(this.iter_base+this.iter_offset*this.cur_num)+"]"))
            new_xpath.node_list = new_xpath.node_list.concat(xpath_to_fit.node_list.slice(1))
            return new_xpath
        }
        else{
            return xpath_to_fit
        }
    }

    exhausted(){
        return this.cur_num >= this.iter_num
    }

    new_turn(){
        this.cur_num += 1
    }
}

class ProgramExecutor{
    constructor() {
        this.content = []
        this.iter_state = null
        this.cur_action_index = 0
    }

    load_program(program,iter_state=null){
        this.content = program.content
        this.iter_state = iter_state
        this.cur_action_index = 0
    }

    execute_one_step(){
        if(this.is_finish()){
            return new Action("")
        }
        let cur_program_unit = this.content[this.cur_action_index]
        this.cur_action_index +=1

        switch(cur_program_unit.unit_type){
            case ProgramUnitType.GoBack:
                return cur_program_unit.to_action()

            case ProgramUnitType.Click:
            case ProgramUnitType.Sendkey: {
                let action = cur_program_unit.to_action()
                if(this.iter_state)
                {
                    action.xpath = this.iter_state.fit(action.xpath)
                }
                else{
                    action.xpath = action.xpath
                }
                return action
            }

            case ProgramUnitType.ForEach:{
                if(this.iter_state)
                {
                    let iter_state = new IterState(cur_program_unit.parameters[0],this.iter_state.fit(cur_program_unit.parameters[1]),
                        cur_program_unit.parameters[2], cur_program_unit.parameters[3], cur_program_unit.parameters[4],
                        cur_program_unit.parameters[5])
                    let executor = new ProgramExecutor()
                    executor.load_program(cur_program_unit.parameters[6],iter_state)
                    return executor.execute_program()
                }
                else
                {
                    let iter_state = new IterState(cur_program_unit.parameters[0],cur_program_unit.parameters[1],
                        cur_program_unit.parameters[2], cur_program_unit.parameters[3], cur_program_unit.parameters[4],
                        cur_program_unit.parameters[5])
                    let executor = new ProgramExecutor()
                    executor.load_program(cur_program_unit.parameters[6],iter_state)
                    return executor.execute_program()
                }
            }
        }
    }

    is_finish(){
        return this.cur_action_index >= this.content.length
    }

    execute_program(start=0, end=this.content.length){
        let trace = new Trace()
        this.cur_action_index = start
        while(true){
            if(this.cur_action_index === end){
                if(this.iter_state)
                {
                    this.iter_state.new_turn();
                    if (this.iter_state.exhausted()) {
                        break;
                    }
                    this.cur_action_index = start;
                 }
                else
                {
                    break;
                }
            }
            while(this.cur_action_index !== end)
            {
                trace.append_action(this.execute_one_step())
            }

        }
        while(trace.action_list[trace.action_list.length-1].action_type === ActionType.Empty){
            trace.action_list.pop()
        }
        return trace
    }
}

export {IterState,ProgramExecutor}