import Trace from "./system/utilclasses/trace.mjs";
import {Action} from "./system/utilclasses/action.mjs";
import {Program} from "./system/utilclasses/program.mjs";
import ProgramAnalyzer from "./system/systems/ProgramAnalyzer.mjs";
import GeneralSet from "./system/utilclasses/generalset.mjs";
import {AnalyzeResult, AnalyzeStatus} from "./system/utilclasses/analyzeResult.mjs";

function analyze_trace(trace,index){
  let result = new AnalyzeResult()
  result.predicted_action = new Array(trace.length)
  result.predicted_programs = new Array(trace.length)
  result.predicted_status = new Array(trace.length)
  let origin_program = new Program(trace)
  for(let i = 0; i < trace.length; ++i){
    //get program fragment
    let program_frag = origin_program.get_subprogram(0,i+1)
    let analyzer = new ProgramAnalyzer(program_frag)
    let program_list = analyzer.start_analyze()
    let predict_set = new GeneralSet()
    //collect unique predictions
    for(let program of program_list){
      let prediction_trace = program.make_prediction()
      if(prediction_trace.length > 0)
      {
        predict_set.add(prediction_trace.action_list[0])
      }
    }
    result.predicted_actions[i] = Array.from(predict_set.values())
    result.predicted_programs[i] = program_list
    //update prediction status(correctness, etc)
    if(result.predicted_actions[i].length === 0){
      result.predicted_status[i] = AnalyzeStatus.NotPredictable
    }
    else
    {
      if(i === trace.length-1)
      {
        result.predicted_status[i] = AnalyzeStatus.Other
      }
      else {
        let has_target = false
        let has_non_target = false
        for (let action of result.predicted_actions[i]) {
          if (action.toString() === trace.action_list[i+1].toString())
          {
            has_target = true
          }
          else
          {
            has_non_target = true
          }
              }
        if(has_target && !has_non_target){
          result.predicted_status[i] = AnalyzeStatus.IsCorrectPrediction
        }
        if(has_target && has_non_target){
          result.predicted_status[i] = AnalyzeStatus.HasCorrectPrediction
        }
        if(!has_target){
          result.predicted_status[i] = AnalyzeStatus.NoCorrectPrediction
        }
      }
    }
    app.$set(app.progress,index,app.progress[index]+70/(trace.length))
  }
  app.analyze_results.push(result)
}

var app = new Vue({
  el: '#app',
  data: {
    trace_index:0,
    traces:[],
    progress:[],
    selected_trace:new Trace(),
    current_selected_trace_index:-1,
    current_selected_action_index:-1,
    analyze_results:[],

    selected_action_status:"",
    selected_prediction_results:[],
    selected_programs_results:[],

  },
  mounted(){
    $("#upload_file_hidden").on("change",function(evt){
      function handleFile(f){
        let this_trace_index = app.trace_index
        app.trace_index += 1
        let trace = new Trace()
        app.traces.push(trace)
        app.progress.push(0)
        JSZip.loadAsync(f).then(zip=>{
          zip.file("trace.json").async("text").then(content=>{
            let trace_json = JSON.parse(content)
            //trace.json loaded and stored into content
            app.$set(app.progress,this_trace_index,app.progress[this_trace_index]+10)
            //init trace
            let trace = new Trace()
            app.traces[this_trace_index].trace_name = trace_json["name"]
            //load actions
            let num_action = trace_json["actions"].length
            for(let action of trace_json["actions"]){
              app.traces[this_trace_index].action_list.push(new Action(action))
            }
            //load doms
            let dom_index = 0
            for(let filename of trace_json["doms"]){
              let cur_dom_index = dom_index
              app.traces[this_trace_index].dom_list.push("")
              dom_index += 1
              zip.file("doms/"+filename).async("text").then(dom=>{
                app.traces[this_trace_index].dom_list[cur_dom_index] = dom
                app.$set(app.progress,this_trace_index,app.progress[this_trace_index]+20/(num_action+1))
                if(cur_dom_index === num_action){
                  analyze_trace(app.traces[this_trace_index],this_trace_index)
                }
              })
            }

          })
        })
      }
      let files = evt.target.files;
      for(let i = 0; i < files.length; i++){
        handleFile(files[i]);
      }
    })
  },
  methods:{
    upload_file_button_click:function(){
      $("#upload_file_hidden").click();
    },

    select_trace:function(index){
      this.selected_trace = this.traces[index]
      this.current_selected_trace_index = index
      this.current_selected_action_index = -1
    },
    select_action:function(index){
      this.current_selected_action_index = index
    },
    convert_status_to_color(status){
      switch (status) {
        case AnalyzeStatus.NoCorrectPrediction:
          return "#d76f6a"
        case AnalyzeStatus.HasCorrectPrediction:
          return "#51a7e7"
        case AnalyzeStatus.IsCorrectPrediction:
          return "#97d992"
        case AnalyzeStatus.NotPredictable:
          return "#bbbbbb"
        case AnalyzeStatus.Other:
          return "#ffffff"
        default:
          return "#000000"
      }
    }

  },

  computed:{
    get_status_text(){
      switch(this.analyze_results[this.current_selected_trace_index].predicted_status[this.current_selected_action_index]){
        case AnalyzeStatus.NoCorrectPrediction:
          return "No correct prediction"
        case AnalyzeStatus.HasCorrectPrediction:
          return "Has correct prediction"
        case AnalyzeStatus.IsCorrectPrediction:
          return "Is correct prediction"
        case AnalyzeStatus.NotPredictable:
          return "Not predictable"
        case AnalyzeStatus.Other:
          return "Last Statement"
        default:
          return "Error"
      }
    },
    get_status_color() {
      let colors = []
      for(let i = 0; i < this.traces[this.current_selected_trace_index].length; ++i){
        colors.push("#ffffff")
      }
      let j = 0
      for(let result of this.analyze_results[this.current_selected_trace_index].predicted_status)
      {
        colors[j] = this.convert_status_to_color(result)
        ++j
      }
      return colors
    }
  }
})