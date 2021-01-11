import {Program} from "../utilclasses/program.mjs";
import {ProgramUnitType} from "../utilclasses/program.mjs";
import {ProgramUnit} from "../utilclasses/program.mjs";
import Xpath from "../utilclasses/xpath.mjs";
import Node from "../utilclasses/node.mjs";

function substitute_program(origin_program, loop_body_start, loop_body_end, match_times, iter_info, inner_iter_list, label){
    let result = new Program()
    for(let i = 0; i < loop_body_start; ++i){
        result.append_unit(origin_program.content[i])
    }

    let loop_body_program = new Program()
    for(let i = loop_body_start; i <= loop_body_end; ++i)
    {
        let loop_inner_index = i-loop_body_start
        if(inner_iter_list[loop_inner_index]){
            //it is a iter, need to construct xpath for it
            //assumption: it can be constructed because we have checked it
            let constructed_xpath = new Xpath()
            constructed_xpath.node_list.push(new Node("<"+label+">"))
            for(let node_afterwords_index = iter_info.element_path.length+1;
                node_afterwords_index < origin_program.content[loop_body_start+loop_inner_index].xpath.length;++node_afterwords_index)
            {
                constructed_xpath.node_list.push(origin_program.content[loop_body_start+loop_inner_index].xpath.node_list[node_afterwords_index])
            }
            switch (origin_program.content[loop_body_start+loop_inner_index].unit_type) {
                case ProgramUnitType.Click:
                    loop_body_program.append_unit(new ProgramUnit(origin_program.content[loop_body_start+loop_inner_index].unit_type,constructed_xpath));
                    break;
                case ProgramUnitType.Sendkey:
                    loop_body_program.append_unit(new ProgramUnit(origin_program.content[loop_body_start+loop_inner_index].unit_type,constructed_xpath,
                        origin_program.content[loop_body_start+loop_inner_index].parameters[1]))
                    break
                case ProgramUnitType.ForEach:
                    loop_body_program.append_unit(new ProgramUnit(origin_program.content[loop_body_start+loop_inner_index].unit_type,
                        origin_program.content[loop_body_start+loop_inner_index].parameters[0],
                        constructed_xpath,origin_program.content[loop_body_start+loop_inner_index].parameters[2],
                        origin_program.content[loop_body_start+loop_inner_index].parameters[3],
                        origin_program.content[loop_body_start+loop_inner_index].parameters[4],
                        origin_program.content[loop_body_start+loop_inner_index].parameters[5],
                        origin_program.content[loop_body_start+loop_inner_index].parameters[6]))
            }
        }
        else
        {
            //it is not a iter
            loop_body_program.append_unit(origin_program.content[i])
        }
    }
    result.append_unit(new ProgramUnit(ProgramUnitType.ForEach,label,iter_info.element_path,iter_info.node_name
        ,iter_info.base, iter_info.offset, match_times, loop_body_program))

    let loop_length = loop_body_end-loop_body_start+1
    for(let i = loop_body_start+match_times*loop_length; i < origin_program.content.length; ++i){
        result.append_unit(origin_program.content[i])
    }

    return result

}

export {substitute_program}