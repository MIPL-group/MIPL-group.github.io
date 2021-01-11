class Node{
    constructor(node_text) {
        this.node_name = ""
        this.node_index = 0
        this.is_iteratable = false
        //used for predict iter
        this.is_label = false

        if(node_text === ""){
            return
        }

        let label_start_pos = node_text.indexOf("<")
        let label_end_pos = node_text.indexOf(">")
        if(label_start_pos !== -1){
            this.is_label = true
            this.node_name = node_text.substring(label_start_pos+1, label_end_pos)
            return;
        }



        let index_start_pos = node_text.indexOf("[")
        let index_end_pos = node_text.indexOf("]")

        if(index_start_pos === -1){
            this.node_name = node_text
            return
        }

        this.node_index = parseInt(node_text.substring(index_start_pos+1,index_end_pos))
        this.node_name = node_text.substring(0,index_start_pos)
        this.is_iteratable = true

    }

    get name(){
        return this.node_name
    }

    get index(){
        return this.node_index
    }

    get offset(){
        return this.node_offset
    }

    set offset(new_offset){
        this.node_offset =new_offset
    }

    set index(new_index){
        this.node_index = new_index
    }

    get iteratable(){
        return this.is_iteratable
    }

    toString(){
        if(this.is_label){
            return "<"+this.node_name+">"
        }

        if(this.is_iteratable){
            return this.node_name + "[" + this.index +"]"
            }
        else
        {
            return this.node_name
        }
    }

    strict_equals(other_node){
        return this.node_name === other_node.node_name &&
            this.iteratable === other_node.iteratable &&
            this.index === other_node.index
    }

    equals_with_offset(other_node){
        if(this.node_name === other_node.node_name && this.iteratable === other_node.iteratable){
            return{result:true, offset: other_node.index - this.node_index}
        }
        else
        {
            return {result:false, offset:0}
        }
    }
}

export default Node