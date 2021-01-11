
function previous_match(program, statement_1_index, statement_2_index, iter_info){
    let i = 0
    while(i < statement_2_index-statement_1_index){
        i += 1
        if(statement_1_index-i < 0){
            i -= 1
            return i
        }
        let cur_unit_first_part = program.content[statement_1_index - i]
        let cur_unit_second_part = program.content[statement_2_index - i]
        //there are two cases: completely match and match with offsets
        if(cur_unit_first_part.equals(cur_unit_second_part))
        {
            continue
        }

        let result = cur_unit_first_part.agree_with_offset(cur_unit_second_part)
        if(result.result){
            if(result.element_path.strict_equals(iter_info.element_path) && result.node_name === iter_info.node_name
                &&result.base === iter_info.base && result.offset === iter_info.offset)
            {
                continue
            }
            else{
                i -= 1
                return i
            }
        }
        else
        {
            i -= 1
            return i
        }
    }

    return i
}

function get_program_loop_body(program, statement_1_index, statement_2_index, iter_info){
    let previous_match_index = statement_1_index- previous_match(program, statement_1_index, statement_2_index, iter_info)
    let post_match_index = statement_1_index + (statement_2_index-statement_1_index-(statement_1_index-previous_match_index))-1
    //the first loop body is program.content[previous_match_index::post_match_index](included)
    return {start:previous_match_index,end:post_match_index}
}

export {get_program_loop_body}