var vm = new Vue({
	el: '#explore',
	data:{
		input_text : 'Search by Course Numbers, Title, or Keywords',
		keywords: '',
		display_result: false,
		search_type: 'Courses',
		search_result:[],
		database:{
			"Courses":[
				{
					"category": "course",
					"title": "computer vision",
					"number": "eecs442",
					"link": "./course/eecs442.html"
				},
				{
					"category": "course",
					"title": "Machine Learning",
					"number": "eecs445",
					"link": "./course/eecs445.html"
				},
				{
					"category": "course",
					"title": "Operating System",
					"number": "eecs482",
					"link": "./course/eecs482.html"
				}
			],
			"Instructors":[
				{
					"category": "Instructors",
					"title": "Professor",
					"name": "Xinyu Wang",
					"link": "./instructor/xinyuwang.html"
				},
				{
					"category": "Instructors",
					"title": "Professor",
					"name": "Joson Corso",
					"link": "./instructor/josoncorso.html"
				},
				{
					"category": "Instructors",
					"title": "Associated Professor",
					"name": "Justin Johnson",
					"link": "./instructor/justinjohnson.html"
				}
			],
			"Majors": [
				{
					"category": "Major",
					"title": "Computer Science BSE",
					"degree": "BSE",
					"link": "./major/Computer_Science_BSE.html"
				},
				{	
					"category": "Major",
					"title": "Computer Science PhD",
					"degree": "PhD",
					"link": "./major/Computer_science_PhD.html"
				}
			]
		}
	},
	components:{
			result
	},
	methods:{
		click: function(event){
			console.log(event.target.value)
			this.search_type = event.target.value
			console.log("search_type", this.search_type)
			this.input_text = 'Search by '
			if(event.target.value === 'Courses'){
				this.input_text += event.target.value + ' Numbers, Title, or Keywords'
			}
			else if(event.target.value === 'Instructors'){
				this.input_text += event.target.value + ' Name'
			}
			else{
				this.input_text += event.target.value + '/Degree Name'
			}
		},
		onEnter: function(event){
			this.search_result = []
			console.log(this.keywords)
			console.log(event.target.value)
			console.log(this.search_type)
			candidates = this.database[this.search_type]
			console.log(candidates)
			for(var i=0; i < candidates.length; i++){
				candidate = candidates[i]
				if(this.search_type=="Courses"){
					if(candidate.number == this.keywords){
						this.search_result.push(candidate)
					}
				}
				else if(this.search_type=="Instructors"){
					if(candidate.name == this.keywords){
						this.search_result.push(candidate)
					}
				}
				else{
					if(candidate.title == this.keywords){
						this.search_result.push(candidate)
					}
				}
			}
			this.display_result = true

		}
	}
})

var dashboard = Vue.component('result_dashboard',{
	created(){
		console.log(result)
	},
	props:['result', 'index'],
	template:`
		<div class="result.name+index">
			<a :href="result.link" v-if="result.category=='Instructors'"> {{result.name}}</a>
			<a :href="result.link" v-else-if="result.category=='Courses'"> {{result.number}}</a>
			<a :href="result.link" v-else>{{result.title}}</a>
		</div>
	`
})

var result = Vue.component('result_block', {
	created(){
		console.log('type', this.type)
	},
	props:['result', 'type'],
	data: function(){
			return {
				perPage: 15,
				currentPage: 1, 
				startIndex: 0,
				endIndex: 10
			}
	},
	computed:{
		totalPages(){
			return Math.ceil(this.result.length / this.perPage)
		}
	},
	components:{
		dashboard
	},
	methods:{
			pagination: function(activePage){
				this.currentPage = activePage;
				this.startIndex = (this.currentPage * this.perPage) - this.perPage;
				this.endIndex = this.startIndex + this.perPage;
			},
			previous: function(){
				if(this.currentPage > 1){
					this.pagination(this.currentPage - 1);
				}
			},
			next: function(){
				if(this.currentPage < this.totalPages){
					this.pagination(this.currentPage + 1);
				}
			}
	},
	template:`
		<div class="card-container">
		  <p class="size" >Showing results <span class="size_page" v-if="result.length <= perPage">1-{{result.length}}</span> <span class="size_page" v-else>1-{{perPage}}</span> of {{result.length}}</p>
			<div v-for="(course, index) in result" v-if="index >= startIndex && index < endIndex">
				<result_dashboard :result="course" :index="index">
				</result_dashboard>
			</div>
			<div v-else>
				<p> No result</p>
			</div>
		    <ul id="pagin"><span class="first">First</span><span class="prev" style="display: none;">Prev</span><li class="paging"><a href="#" class="paging_num current">1</a></li><span class="next" style="display: none;">Next</span><span class="last">Last</span></ul>
		  </div>
	`
})