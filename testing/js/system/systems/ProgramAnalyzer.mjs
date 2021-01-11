import {Program} from "../utilclasses/program.mjs";
import {get_program_loop_body} from "../Algorithm/getloopbody.mjs";
import {get_max_expand_times} from "../Algorithm/get_max_expand_times.mjs";
import {substitute_program} from "../Algorithm/substitude_program.mjs";
import GeneralSet from "../utilclasses/generalset.mjs";

class Worklist{
    constructor() {
        this.worklist = []
        this.existance_dic = {}
    }

    pop(){
        let item =  this.worklist.shift()
        delete this.existance_dic[item.program.toString()+item.cur_index]
        return item
    }

    push(item) {
        if (item.program.toString() + item.cur_index in this.existance_dic) {
            return
        }
        this.existance_dic[item.program.toString() + item.cur_index] = 1
        this.worklist.push(item)
    }

    get length(){
        return this.worklist.length
    }
}

class ProgramAnalyzerWorkStatus{
    constructor(program,cur_index = 0) {
        this.program = program
        this.cur_index = cur_index
    }
}


class ProgramAnalyzer{
    constructor(program) {
        this.program = program
        this.work_list = new Worklist()
        this.work_list.push(new ProgramAnalyzerWorkStatus(this.program))
        this.result = new GeneralSet()
    }

    //procedure: find pair -> get loop body -> expanding test -> if test passed, then push substitute into worklist -> going on
    start_analyze(){
        while(this.work_list.length>0){
            let cur_program_status = this.work_list.pop()
            let modified = false
            let a_complete_test = false

            //the item to be added to result must suffer a complete test

            if(cur_program_status.cur_index === 0)
            {
                a_complete_test = true
            }

            // find pair
            for(let i = cur_program_status.cur_index; i < cur_program_status.program.size; i++){
                for(let j = i+1; j < cur_program_status.program.size;j++)
                {
                    let result = cur_program_status.program.content[i].agree_with_offset(cur_program_status.program.content[j])
                    if(result.result){
                        //pair found, start to get loop body
                        let loop_body = get_program_loop_body(cur_program_status.program,i,j,result)
                        //possible loop body get, expanding test
                        let expand_info = get_max_expand_times(cur_program_status.program,loop_body.start, loop_body.end, result)
                        //whether test passed
                        if(expand_info.match_times === 1){
                            //test not passed, continue
                            continue;
                        }
                        //substitute into worklist
                        let new_program = substitute_program(cur_program_status.program,loop_body.start,loop_body.end,
                            expand_info.match_times,result,expand_info.is_iter_list,"v")
                        let loop_length = loop_body.end-loop_body.start+1
                        this.work_list.push(new ProgramAnalyzerWorkStatus(new_program,loop_body.start))
                        this.work_list.push(new ProgramAnalyzerWorkStatus(new_program,0))
                        modified = true
                    }
                }
            }
            if(!modified && a_complete_test){
                //if(cur_program_status.program.make_prediction().length)
                //{
                    this.result.add(cur_program_status.program)
                //}
            }
        }
        return Array.from(this.result.values()).sort((a,b)=>{return (a.length-b.length)})
    }

}

export default ProgramAnalyzer