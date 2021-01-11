import {Action} from "./action.mjs";

class Trace{
    constructor(json_file_path = "") {
        this.action_list = []
        this.dom_list = []
        this.trace_name =""
    }
    append_action(action){
        if(action instanceof Trace){
            for(let item of action.action_list){
               this.append_action(item)
            }
        }else if(action instanceof Array)
        {
            for(let single_action of action){
                this.append_action(single_action)
            }
        }
        else
        {
            if(typeof action === "string"){
                this.action_list.push(new Action(action))
            }
            else
            {
                this.action_list.push(action)
            }
        }

    }

    append_dom(dom){
        if(dom instanceof Array)
        {
            for(let single_action of dom){
                this.append_dom(single_action)
            }
        }
        else
        {
            this.dom_list.push(dom)
        }
    }

    toString(){
        let result = ""
        for(let action of this.action_list){
            result += action.toString() + "\n"
        }
        return result
    }

    equals(other){
        return this.toString() === other.toString()
    }

    get length(){
        return this.action_list.length
    }
}

export default Trace