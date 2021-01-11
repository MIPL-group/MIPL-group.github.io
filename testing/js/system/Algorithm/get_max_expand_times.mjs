function get_max_expand_times(program, loop_body_start, loop_body_end, iter_info){
    let loop_length = loop_body_end-loop_body_start+1
    let match_times = 1
    let is_iter = []

    for(;loop_body_start+(match_times+1)*loop_length<=program.content.length;match_times++)
    {
        for(let loop_inner_index = 0; loop_inner_index < loop_length; ++loop_inner_index)
        {
            let cur_unit_first_part = program.content[loop_body_start+loop_inner_index]
            let cur_unit_second_part = program.content[loop_body_start+loop_inner_index+ loop_length*match_times]
            //there are two cases: completely match and match with offsets
            if(cur_unit_first_part.equals(cur_unit_second_part))
            {
                if(match_times === 1){
                    is_iter.push(false)
                }
                continue
            }

            let result = cur_unit_first_part.agree_with_offset(cur_unit_second_part)
            if(result.result){
                if(result.element_path.strict_equals(iter_info.element_path) && result.node_name === iter_info.node_name
                    &&result.base === iter_info.base && result.offset === iter_info.offset * match_times)
                {
                    //set whether a program unit includes a iter if it's the first pass during testing
                    if(match_times === 1){
                        is_iter.push(true)
                    }
                    continue
                }
                else{
                    return {match_times:match_times, is_iter_list:is_iter}
                }
            }
            else
            {
                return {match_times:match_times, is_iter_list:is_iter}
            }
        }
    }
    return {match_times:match_times, is_iter_list:is_iter}
}

export {get_max_expand_times}