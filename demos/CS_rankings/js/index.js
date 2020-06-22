var checkbox_el = Vue.component('checkboxes', {
    created(){
        console.log('field', this.field);
    },
    props:['field', 'name'],
    methods:{
        check: function(value){
            this.$parent.check(value);
        }
    },
    template:`
        <tr>
            <label for="name">
                {{field.name}}
            </label>
            <input type="checkbox" name="name" id="name"
            :value="field.name" @change='check(field.name)'
            :key="field.name">
        </tr>
    `
})


var faculty_el = Vue.component('faculty', {
	created(){
			console.log('faculty', this.faculty)
	},
	props:['faculty'],
	template:`
		<tr>
		    <td>
		        &nbsp;&nbsp;&nbsp;&nbsp;
		    </td>
		    <td>
		        <small>
		            <a title="Click for author's home page." target="_blank" href="faculty[1].href" onclick="trackOutboundLink('faculty[1].href', true); return false;">
		                {{faculty[0]}}
		            </a>&nbsp;
		        </small>
		    </td>
		    <td align="right">
		        <small>
		            {{faculty[1].Pubs}}
		        </small>
		    </td>
		    <td align="right">
		        <small>
		            {{faculty[1].Adj}}
		        </small>
		    </td>
		</tr>
	`
})
var ranking_el = Vue.component('Ranking', {
	created(){
		console.log('ranking', this.university)
	},
	props: ['university'],
	data: function(){
		return {
			display_block: false
		}
	},
	template: `
	    <tr>
	    	<td>
			{{university[1].ranking+1}}&nbsp;
			</td>
			<span v-if="display_block" class="hovertip" @click="display_block=false;" :id="university[1].name+'-widget'"><font color="blue">▼</font></span>
			<span v-else class="hovertip" @click="display_block=true;" :id="university[1].name+'-widget'"><font color="blue">►</font></span>
			<td>
			&nbsp;{{university[0]}}&nbsp;
			</td>
			<td align="right">
			&nbsp;{{university[1].Count}}&nbsp;
            </td>
            <td>
            {{university[1].faculty.length}}
            </td>
			<td colspan="4">
				<div v-if="display_block">
					<div class="table">
						<table class="table table-sm table-striped">
						<thead><tr><th></th><td><small><em><abbr title="Click on an author's name to go to their home page.">Faculty</abbr></em></small></td><td align="right"><small><em>&nbsp;&nbsp;<abbr title="Total number of publications (click for DBLP entry).">#&nbsp;Pubs</abbr> </em></small></td><td align="right"><small><em><abbr title="Count divided by number of co-authors">Adj.&nbsp;#</abbr></em></small></td></tr></thead>
						<faculty v-for="faculty in university[1].faculty" :faculty="faculty" :key="faculty.name"></faculty>
						</table>
					</div>
				</div>
			</td>
		</tr>
	  `
})

var vm = new Vue(
    {
        el: '#app',
        data:{
            checkedFields:[],
            sortedArray:[],
            Directions :[
                { 
					isCheckAll: false,
					isAlreadyExist: false,
                    name : 'AI',
                    on_id : 'ai_area_on',
                    off_id : 'ai_area_off',
                    fields:[
                        { name : 'Artifical intelligence'},
                        { name : 'Computer Vision'},
                        { name : 'Machine Learning'}
                    ]
                },
                { 
					isCheckAll: false,					
					isAlreadyExist: false,
                    name : 'Systems',					
                    on_id : 'sys_area_on',
                    off_id : 'sys_area_off',
                    fields:[
                        { name : 'Computer Architecture'},
                        { name : 'Computer Networks'},
                        { name : 'Databases'}
                    ]
                }
            ],
            output:[],
            sortedOutput:{},
			result: {
    "Artifical intelligence":[
        {
            "ranking" : "1",
            "name" : "Carnegie Mellon University",
            "Count" : 54,
            "faculty" : [
                {
                    "ranking" : "1",
                    "name" : "Tuomas Sandholm",
                    "Pubs": 33,
                    "Adj": 12.9,
                    "href": "http://www.cs.cmu.edu/~sandholm"
                },
                {
                    "ranking": "2",
                    "name" : "Fei Fang",
                    "Pubs": 19,
                    "Adj": 3.7,
                    "href": "https://www.andrew.cmu.edu/user/feif"
                },
                {
                    "ranking": "3",
                    "name" : "J.Andrew Bagnell",
                    "Pubs": 10,
                    "Adj": 2.6,
                    "href": "http://www.ri.cmu.edu/person.html?person_id=689"
                }
            ]
        },
        {
            "ranking" : "2",
            "name" : "Harvard University",
            "Count" : 50,
            "faculty" : [
                {
                    "ranking" : "1",
                    "name" : "Ariel D.P",
                    "Pubs": 48,
                    "Adj": 12.9,
                    "href": "https://teamcore.seas.harvard.edu/tambe"
                },
                {
                    "ranking": "2",
                    "name" : "Harvard Tang",
                    "Pubs": 19,
                    "Adj": 3.56,
                    "href": "https://www.andreiod.cmu.edu/user/Harvard Tang"
                },
                {
                    "ranking": "3",
                    "name" : "J.Andrew Bagnell",
                    "Pubs": 15,
                    "Adj": 2.231,
                    "href": "http://www.ri.cmu.edu/person.html?person_id=8989"
                }
            ]
        },
        {
            "ranking" : "3",
            "name" : "Shanghai Jiao Tong University",
            "Count" : 46,
            "faculty" : [
                {
                    "ranking" : "1",
                    "name" : "Xinyu Wang",
                    "Pubs": 33,
                    "Adj": 12.9,
                    "href": "http://www.cs.cmu.edu/~sandholm"
                },
                {
                    "ranking": "2",
                    "name" : "Baiyu Yang",
                    "Pubs": 19,
                    "Adj": 3.7,
                    "href": "https://www.andrew.cmu.edu/user/feif"
                },
                {
                    "ranking": "3",
                    "name" : "Pengyuan Huang",
                    "Pubs": 10,
                    "Adj": 2.6,
                    "href": "http://www.ri.cmu.edu/person.html?person_id=689"
                }
            ]
        }
    ],
    "Computer Vision":[
        {
            "ranking" : "1",
            "name" : "Harvard University",
            "Count" : 46,
            "faculty" : [
                {
                    "ranking" : "1",
                    "name" : "Ariel D.P",
                    "Pubs": 48,
                    "Adj": 12.9,
                    "href": "https://teamcore.seas.harvard.edu/tambe"
                },
                {
                    "ranking": "2",
                    "name" : "Harvard Tang",
                    "Pubs": 19,
                    "Adj": 3.56,
                    "href": "https://www.andreiod.cmu.edu/user/Harvard Tang"
                },
                {
                    "ranking": "3",
                    "name" : "J.Andrew Bagnell",
                    "Pubs": 15,
                    "Adj": 2.231,
                    "href": "http://www.ri.cmu.edu/person.html?person_id=8989"
                }
            ]
        },
        {
            "ranking" : "2",
            "name" : "Carnegie Mellon University",
            "Count" : 42,
            "faculty" : [
                {
                    "ranking" : "1",
                    "name" : "Tuomas Sandholm",
                    "Pubs": 33,
                    "Adj": 12.9,
                    "href": "http://www.cs.cmu.edu/~sandholm"
                },
                {
                    "ranking": "2",
                    "name" : "Fei Fang",
                    "Pubs": 19,
                    "Adj": 3.7,
                    "href": "https://www.andrew.cmu.edu/user/feif"
                },
                {
                    "ranking": "3",
                    "name" : "J.Andrew Bagnell",
                    "Pubs": 10,
                    "Adj": 2.6,
                    "href": "http://www.ri.cmu.edu/person.html?person_id=689"
                }
            ]
        },
        
        {
            "ranking" : "3",
            "name" : "Shanghai Jiao Tong University",
            "Count" : 40,
            "faculty" : [
                {
                    "ranking" : "1",
                    "name" : "Xinyu Wang",
                    "Pubs": 33,
                    "Adj": 12.9,
                    "href": "http://www.cs.cmu.edu/~sandholm"
                },
                {
                    "ranking": "2",
                    "name" : "Baiyu Yang",
                    "Pubs": 19,
                    "Adj": 3.7,
                    "href": "https://www.andrew.cmu.edu/user/feif"
                },
                {
                    "ranking": "3",
                    "name" : "Pengyuan Huang",
                    "Pubs": 10,
                    "Adj": 2.6,
                    "href": "http://www.ri.cmu.edu/person.html?person_id=689"
                }
            ]
        }
    ],
    "Machine Learning":[
        {
            "ranking" : "1",
            "name" : "Shanghai Jiao Tong University",
            "Count" : 77,
            "faculty" : [
                {
                    "ranking" : "1",
                    "name" : "Xinyu Wang",
                    "Pubs": 33,
                    "Adj": 12.9,
                    "href": "http://www.cs.cmu.edu/~sandholm"
                },
                {
                    "ranking": "2",
                    "name" : "Baiyu Yang",
                    "Pubs": 19,
                    "Adj": 3.7,
                    "href": "https://www.andrew.cmu.edu/user/feif"
                },
                {
                    "ranking": "3",
                    "name" : "Pengyuan Huang",
                    "Pubs": 10,
                    "Adj": 2.6,
                    "href": "http://www.ri.cmu.edu/person.html?person_id=689"
                }
            ]
        },
        {
            "ranking" : "2",
            "name" : "Harvard University",
            "Count" : 70,
            "faculty" : [
                {
                    "ranking" : "1",
                    "name" : "Ariel D.P",
                    "Pubs": 48,
                    "Adj": 12.9,
                    "href": "https://teamcore.seas.harvard.edu/tambe"
                },
                {
                    "ranking": "2",
                    "name" : "Harvard Tang",
                    "Pubs": 19,
                    "Adj": 3.56,
                    "href": "https://www.andreiod.cmu.edu/user/Harvard Tang"
                },
                {
                    "ranking": "3",
                    "name" : "J.Andrew Bagnell",
                    "Pubs": 15,
                    "Adj": 2.231,
                    "href": "http://www.ri.cmu.edu/person.html?person_id=8989"
                }
            ]
        },
        {
            "ranking" : "3",
            "name" : "Carnegie Mellon University",
            "Count" : 46,
            "faculty" : [
                {
                    "ranking" : "1",
                    "name" : "Tuomas Sandholm",
                    "Pubs": 33,
                    "Adj": 12.9,
                    "href": "http://www.cs.cmu.edu/~sandholm"
                },
                {
                    "ranking": "2",
                    "name" : "Fei Fang",
                    "Pubs": 19,
                    "Adj": 3.7,
                    "href": "https://www.andrew.cmu.edu/user/feif"
                },
                {
                    "ranking": "3",
                    "name" : "J.Andrew Bagnell",
                    "Pubs": 10,
                    "Adj": 2.6,
                    "href": "http://www.ri.cmu.edu/person.html?person_id=689"
                }
            ]
        }
    ],
    "Computer Architecture":[
        {
            "ranking" : "1",
            "name" : "Carnegie Mellon University",
            "Count" : 146,
            "faculty" : [
                {
                    "ranking" : "1",
                    "name" : "Pengyuan Huang",
                    "Pubs": 33,
                    "Adj": 12.9,
                    "href": "http://www.cs.cmu.edu/~sandholm"
                },
                {
                    "ranking": "2",
                    "name" : "Yuetao Li",
                    "Pubs": 19,
                    "Adj": 3.7,
                    "href": "https://www.andrew.cmu.edu/user/feif"
                },
                {
                    "ranking": "3",
                    "name" : "Rui Dong",
                    "Pubs": 10,
                    "Adj": 2.6,
                    "href": "http://www.ri.cmu.edu/person.html?person_id=689"
                }
            ]
        },
        {
            "ranking" : "2",
            "name" : "Harvard University",
            "Count" : 126,
            "faculty" : [
                {
                    "ranking" : "1",
                    "name" : "Ariel D.P",
                    "Pubs": 48,
                    "Adj": 12.9,
                    "href": "https://teamcore.seas.harvard.edu/tambe"
                },
                {
                    "ranking": "2",
                    "name" : "Harvard Tang",
                    "Pubs": 19,
                    "Adj": 3.56,
                    "href": "https://www.andreiod.cmu.edu/user/Harvard Tang"
                },
                {
                    "ranking": "3",
                    "name" : "J.Andrew Bagnell",
                    "Pubs": 15,
                    "Adj": 2.231,
                    "href": "http://www.ri.cmu.edu/person.html?person_id=8989"
                }
            ]
        },
        {
            "ranking" : "3",
            "name" : "Shanghai Jiao Tong University",
            "Count" : 110,
            "faculty" : [
                {
                    "ranking" : "1",
                    "name" : "Xinyu Wang",
                    "Pubs": 33,
                    "Adj": 12.9,
                    "href": "http://www.cs.cmu.edu/~sandholm"
                },
                {
                    "ranking": "2",
                    "name" : "Baiyu Yang",
                    "Pubs": 19,
                    "Adj": 3.7,
                    "href": "https://www.andrew.cmu.edu/user/feif"
                },
                {
                    "ranking": "3",
                    "name" : "Pengyuan Huang",
                    "Pubs": 10,
                    "Adj": 2.6,
                    "href": "http://www.ri.cmu.edu/person.html?person_id=689"
                }
            ]
        }
    ],
    "Computer Networks":[
        {
            "ranking" : "1",
            "name" : "Carnegie Mellon University",
            "Count" : 96,
            "faculty" : [
                {
                    "ranking" : "1",
                    "name" : "Xinyu Wang",
                    "Pubs": 33,
                    "Adj": 12.9,
                    "href": "http://www.cs.cmu.edu/~sandholm"
                },
                {
                    "ranking": "2",
                    "name" : "John Reese",
                    "Pubs": 19,
                    "Adj": 3.7,
                    "href": "https://www.andrew.cmu.edu/user/feif"
                },
                {
                    "ranking": "3",
                    "name" : "Harold Finch",
                    "Pubs": 10,
                    "Adj": 2.6,
                    "href": "http://www.ri.cmu.edu/person.html?person_id=689"
                }
            ]
        },
        {
            "ranking" : "2",
            "name" : "Harvard University",
            "Count" : 86,
            "faculty" : [
                {
                    "ranking" : "1",
                    "name" : "Root",
                    "Pubs": 48,
                    "Adj": 12.9,
                    "href": "https://teamcore.seas.harvard.edu/tambe"
                },
                {
                    "ranking": "2",
                    "name" : "Joss Carter",
                    "Pubs": 19,
                    "Adj": 3.56,
                    "href": "https://www.andreiod.cmu.edu/user/Harvard Tang"
                },
                {
                    "ranking": "3",
                    "name" : "Lionel Fusco",
                    "Pubs": 15,
                    "Adj": 2.231,
                    "href": "http://www.ri.cmu.edu/person.html?person_id=8989"
                }
            ]
        },
        {
            "ranking" : "3",
            "name" : "Shanghai Jiao Tong University",
            "Count" : 76,
            "faculty" : [
                {
                    "ranking" : "1",
                    "name" : "Sam Groves",
                    "Pubs": 33,
                    "Adj": 12.9,
                    "href": "http://www.cs.cmu.edu/~sandholm"
                },
                {
                    "ranking": "2",
                    "name" : "Sameen Shaw",
                    "Pubs": 19,
                    "Adj": 3.7,
                    "href": "https://www.andrew.cmu.edu/user/feif"
                },
                {
                    "ranking": "3",
                    "name" : "Pengyuan Huang",
                    "Pubs": 10,
                    "Adj": 2.6,
                    "href": "http://www.ri.cmu.edu/person.html?person_id=689"
                }
            ]
        }
    ],
    "Databases":[
        {
            "ranking" : "1",
            "name" : "Carnegie Mellon University",
            "Count" : 43,
            "faculty" : [
                {
                    "ranking" : "1",
                    "name" : "Leon Tao",
                    "Pubs": 33,
                    "Adj": 12.9,
                    "href": "http://www.cs.cmu.edu/~sandholm"
                },
                {
                    "ranking": "2",
                    "name" : "Nicholas Donnelly",
                    "Pubs": 19,
                    "Adj": 3.7,
                    "href": "https://www.andrew.cmu.edu/user/feif"
                },
                {
                    "ranking": "3",
                    "name" : "Carl Elias",
                    "Pubs": 10,
                    "Adj": 2.6,
                    "href": "http://www.ri.cmu.edu/person.html?person_id=689"
                }
            ]
        },
        {
            "ranking" : "2",
            "name" : "Harvard University",
            "Count" : 26,
            "faculty" : [
                {
                    "ranking" : "1",
                    "name" : "Nathan Ingram",
                    "Pubs": 48,
                    "Adj": 12.9,
                    "href": "https://teamcore.seas.harvard.edu/tambe"
                },
                {
                    "ranking": "2",
                    "name" : "Grace Hendricks",
                    "Pubs": 19,
                    "Adj": 3.56,
                    "href": "https://www.andreiod.cmu.edu/user/Harvard Tang"
                },
                {
                    "ranking": "3",
                    "name" : "Zoe Morgan",
                    "Pubs": 15,
                    "Adj": 2.231,
                    "href": "http://www.ri.cmu.edu/person.html?person_id=8989"
                }
            ]
        },
        {
            "ranking" : "3",
            "name" : "Shanghai Jiao Tong University",
            "Count" : 26,
            "faculty" : [
                {
                    "ranking" : "1",
                    "name" : "Anthony Marconi",
                    "Pubs": 33,
                    "Adj": 12.9,
                    "href": "http://www.cs.cmu.edu/~sandholm"
                },
                {
                    "ranking": "2",
                    "name" : "Ross Garrison",
                    "Pubs": 19,
                    "Adj": 3.7,
                    "href": "https://www.andrew.cmu.edu/user/feif"
                },
                {
                    "ranking": "3",
                    "name" : "Denton Weeks",
                    "Pubs": 10,
                    "Adj": 2.6,
                    "href": "http://www.ri.cmu.edu/person.html?person_id=689"
                }
            ]
        }
    ]
}
        },
		components:{
			ranking_el,
            faculty_el,
            checkbox_el
		},
        methods: {
			checkAll: function(direction, event){
				console.log(event.target.id)
				if(event.target.id==direction.on_id){
					if(direction.isAlreadyExist){
						return;
					}
					direction.isCheckAll = true;
					direction.isAlreadyExist = true;
					for(var i=0; i <direction.fields.length;i++){
						var newItem = direction.fields[i].name;
                        this.checkedFields.push(newItem);
                        this.output.push({"name" : newItem, "data":this.result[newItem]});
                    }
				}
				else{
					direction.isCheckAll= false;
                    direction.isAlreadyExist = false;
                    console.log("remove all", this.checkedFields);
                    console.log("remove all", this.output);
					for(var i=0; i <direction.fields.length;i++){
                        this.checkedFields = this.checkedFields.filter(item=> item!=direction.fields[i].name);
                        this.output = this.output.filter(item => item.name != direction.fields[i].name);
					}
                }
                this.sortedAll();
				console.log(this.checkedFields);
			},
            check: function(name){
                    console.log('check', name);
                    for(var i=0; i < this.output.length;i++){
                        if(this.output[i].name === name){
                            this.output = this.output.filter(item => item.name != name);
                            this.sortedAll();
                            return;
                        }
                    }
                    this.output.push({"name" : name, "data":this.result[name]});
                    console.log(this.output);
                    this.sortedAll();
                },
                sortedAll: function(){
                    this.sortedOutput = {}
                    for(var i=0; i < this.output.length; i++){
                        var field_info = this.output[i];
                        console.log('field_info', field_info);
                        for(var j=0; j < field_info.data.length; j++){
                            var name = field_info.data[j].name
                            if(name in this.sortedOutput){
                                this.sortedOutput[name]["Count"] += field_info.data[j].Count
                                for(var p=0; p < field_info.data[j].faculty.length;p++){
                                    var faculty_name = field_info.data[j].faculty[p].name;
                                    if(faculty_name in this.sortedOutput[name]["faculty"]){
                                        this.sortedOutput[name]["faculty"][faculty_name]["Adj"] += field_info.data[j].faculty[p].Adj
                                        this.sortedOutput[name]["faculty"][faculty_name]["Pubs"] += field_info.data[j].faculty[p].Pubs
                                    }
                                    else{
                                        this.sortedOutput[name]["faculty"][faculty_name] = {};
                                        this.sortedOutput[name]["faculty"][faculty_name]["Adj"] = field_info.data[j].faculty[p].Adj;
                                        this.sortedOutput[name]["faculty"][faculty_name]["Pubs"] = field_info.data[j].faculty[p].Pubs;
                                        this.sortedOutput[name]["faculty"][faculty_name]["href"] = field_info.data[j].faculty[p].href
                                    }
                                }
                            }
                            else{
                                var faculty = "faculty";
                                this.sortedOutput[name] = {};
                                this.sortedOutput[name]["Count"] = field_info.data[j].Count;
                                this.sortedOutput[name]["faculty"] = {};
                                for(var p = 0; p < field_info.data[j].faculty.length; p++){
                                    var faculty_name = field_info.data[j].faculty[p].name;
                                    this.sortedOutput[name][faculty][faculty_name] = {};
                                    this.sortedOutput[name][faculty][faculty_name]["Adj"] = field_info.data[j].faculty[p].Adj;
                                    this.sortedOutput[name][faculty][faculty_name]["Pubs"] = field_info.data[j].faculty[p].Pubs;
                                    this.sortedOutput[name][faculty][faculty_name]["href"] = field_info.data[j].faculty[p].href
                                }
                            }
                        }
                    }
                    console.log(this.sortedOutput);
                    this.sortedArray = []
                    for (var university in this.sortedOutput){
                        this.sortedArray.push([university, this.sortedOutput[university]])
                    }
                    this.sortedArray.sort(function(a,b){return -a[1].Count+b[1].Count})
                    for (var i=0; i<this.sortedArray.length;i++){
                        this.sortedArray[i][1]["ranking"] = i
                        var sortedFaculty = []
                        for(var faculty_info in this.sortedArray[i][1].faculty){
                            sortedFaculty.push([faculty_info, this.sortedArray[i][1].faculty[faculty_info]])
                        }
                        sortedFaculty.sort(function(a,b){return -a[1].Adj+b[1].Adj})
                        console.log('sortedFaculty:', sortedFaculty)
                        for(var j=0;j<sortedFaculty.length;j++){
                            this.sortedArray[i][1].faculty = sortedFaculty
                        }
                    }
                    console.log(this.sortedArray)
                    
                }
            }
    }
)


