import Xpath from "./xpath.mjs";
function xpath_agree_without_one_offset(xpath1, xpath2){
    if(xpath1.node_list.length !== xpath2.node_list.length){
        return {result:false}
    }
    let found_difference = false
    let offset = 0
    let diff_index = xpath1.node_list.length-1

    for(let i = 0; i < xpath1.node_list.length; i++)
    {
        if(found_difference){
            if(xpath1.node_list[i].strict_equals(xpath2.node_list[i])){
                continue;
            }
            else
            {
                return {result:false}
            }
        }
        else
        {
            let compare_result = xpath1.node_list[i].equals_with_offset(xpath2.node_list[i])
            if(compare_result.result)
            {
                if(compare_result.offset !== 0)
                {
                    found_difference = true
                    offset = compare_result.offset
                    diff_index = i
                }
                else{
                    if(xpath1.node_list[i].iteratable)
                    {
                        diff_index = i
                    }
                    continue;
                }
            }
        else
            {
                return {result:false}
            }
        }
    }
    let element_xpath = new Xpath()
    for(let i = 0; i < diff_index; i++){
        element_xpath.node_list.push(xpath1.node_list[i])
    }
    let node_name = xpath1.node_list[diff_index].node_name
    let base = xpath1.node_list[diff_index].node_index

    return {result:true, element_path:element_xpath, node_name:node_name, base:base, offset:offset}
}

export {xpath_agree_without_one_offset}