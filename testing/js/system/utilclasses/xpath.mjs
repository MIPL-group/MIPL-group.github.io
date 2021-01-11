import Node from "./node.mjs";

class Xpath{
    constructor(xpath_text="") {
        this.node_list = []
        if(xpath_text === ""){
            return
        }
        let separated_texts = xpath_text.split("/")
        if(separated_texts[0] === ""){
            separated_texts.shift()
        }
        for(let node_str of separated_texts)
        {
            this.node_list.push(new Node(node_str))
        }
    }

    toString(){
        let result = ""
        for(let node of this.node_list){
            if(node.is_label){
                result += node.toString()
            }
            else
            {
                result += "/" + node.toString()
            }
        }
        return result
    }

    get length(){
        return this.node_list.length
    }

    strict_equals(other_xpath){
        if(this.node_list.length !== other_xpath.length){
            return false
        }
        for(let i = 0; i < this.node_list.length; i++){
            if(this.node_list[i].strict_equals(other_xpath.node_list[i])){
                continue;
            }
            else
            {
                return false;
            }
        }
        return true;
    }

}

export default Xpath