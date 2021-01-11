import Xpath from "./xpath.mjs";

const ActionType = {
    Click : 0,
    Sendkey : 1,
    GoBack : 2,
    Empty : 3
}

/**
This is a util class for Action.
 */
class Action{
    /**
     * Construct an action from text
     * @param action_text (string), the raw action string
     */
    constructor(action_text) {
        this.parameters = []
        //empty text
        if(action_text === ""){
            this.action_type = ActionType.Empty
            return
        }

        let string_array = action_text.split(" ")
        let commandtext = string_array.shift()
        //click action
        //format: click [xpath]
        if(commandtext === "click"){
            this.action_type = ActionType.Click
            this.parameters[0] = new Xpath(string_array.join(" "))
            return
        }
        //sendkey action
        //format: sendkey [xpath] [value]
        if(commandtext === "sendkey"){
            this.action_type = ActionType.Sendkey
            this.parameters[0] = new Xpath(string_array.shift())
            this.parameters[1] = string_array.join(" ")
            return
        }

        //goback action
        //format: goback
        if(commandtext === "goback"){
            this.action_type = ActionType.GoBack
        }
    }

    get xpath(){
        if(this.action_type === ActionType.Click || this.action_type === ActionType.Sendkey)
        {
            return this.parameters[0]
        }
        else
        {
            return new Xpath("")
        }
    }

    set xpath(new_xpath){
        if(this.action_type === ActionType.Click || this.action_type === ActionType.Sendkey)
        {
            this.parameters[0] = new_xpath
        }
    }

    toString(){
        switch (this.action_type) {
            case ActionType.Click:
                return "click " + this.parameters[0]
            case ActionType.Sendkey:
                return "sendkey " + this.parameters[0] + " " + this.parameters[1]
            case ActionType.GoBack:
                return "goback"
            case ActionType.Empty:
                return ""
        }
    }
}

export {
    ActionType,
    Action
}

