<template>
    <div id="filter_set">

    </div>
</template>

<script>
export default {
    data:{
			"title": ["Low Mile", "Famous Make", "new model", "Duplex", "Historic"],
			"FirstName": ["Justin", "Reese", "Finch",  "Lionel", "Carter", "James", "Peng", "Step"],
			"LastName": ["Johnson", "John", "Harold", "Joss", "Harden", "Curry", "Huang"],
			"phone": 11,
			"email": "@gmail.com",
			"make": ["Audi", "Ford", "BMW", 'Chevrolet', "Jeep"],
			"filter_values": {
				"make": "Audi",
				"mile-max": 10000,
				"mile-min": 1000,
				"miles": 100,
				"price-max": 50000,
				"price-min": 10000,
				"year-max": 2020,
				"year-min": 2007,
				"zip": "48105"
			},
			"keyword": "none",
			"show_search_area": true,
			"show_result_area": false,
			"dataset": "none",
			"results":[],
			"curr_page_results":[],
			"chosen_page": 0,
			"chosen_row": 0,
			"chosen_idx": 0
    },
    components:{
        
    },
    methods: {
			filterInput: function(event){
				// console.log(event.target.value);
				var id = event.target.id;
				// console.log(id);
				var input = event.target.value;
				this.filter_values[id] = input;
				console.log(this.filter_values);
			},
			searchInput: function(event){
				var keyword = event.target.value;
				this.keyword = keyword;
			},
			getOneRandom: function(min, max){
				return Math.floor(Math.random() * (max - min)) + min;
			},
			generateRandoms: function(min, max, k){
				var list_rs = [];
				for(var i=0; i < k; i++){
					var r = this.getOneRandom(min, max);
					list_rs.push(r);
				}
				return list_rs;
			},
			getRandomStr:function(keyword, k){
				var min = 0;
				var max = 0;
				if(keyword == "title"){
					// console.log(this.title);
					max = this.title.length;
					var valid_list = [];						
					var idxs = this.generateRandoms(min, max, k);
					for(var i=0; i < k; i++){
						var str = this.title[idxs[i]];
						valid_list.push(str);
					}
					return valid_list;
				}
				else if(keyword == "FirstName"){
					max = this.FirstName.length;
					var valid_list = [];
					var idxs = this.generateRandoms(min, max, k);
					for(var i=0; i < k; i++){
						var str = this.FirstName[idxs[i]];
						valid_list.push(str);
					}
					return valid_list;
				}
				else if(keyword == "LastName"){
					max = this.LastName.length;
					var valid_list = [];
					var idxs = this.generateRandoms(min, max, k);
					for(var i=0; i < k; i++){
						var str = this.LastName[idxs[i]];
						valid_list.push(str);
					}
					return valid_list;
				}
				else if(keyword == "phone"){
					var max = 9;
					var k2 = this.phone;
					var list_strs = [];
					for(var i=0; i < k; i++){
						var list_chars = this.generateRandoms(min, max, k2);
						var str = list_chars.join("");
						console.log(str);
						list_strs.push(str);
					}
					return list_strs;
				}
			},
			generateResults: function(){
				// console.log(event.target.value);
				var keyword = this.keyword;
				var filter_set = this.filter_values;
				var list_fs = ["miles", "zip", "price", "make", "year", "mile"]
				var pages = this.getOneRandom(0, 5);
				var num_results = 21 * pages;
				var curr_results = {};
				curr_results["num"] = num_results;
				var list_ts = ["title", "FirstName", "LastName", "phone"]
				for(var i = 0; i < 4; i++){
					var key = list_ts[i];
					var randomValue = this.getRandomStr(key, num_results);
					curr_results[key] = randomValue;
				}
				for(var i = 0; i < 6; i++){
					var key = list_fs[i];
					if (key == "miles" || key == "zip"){
						curr_results[key] = this.filter_values[key];
					}
					else if (key == "price"){
						var price_min = this.filter_values["price-min"];
						var price_max = this.filter_values["price-max"];
						curr_results[key] = this.generateRandoms(price_min, price_max, num_results);
					}
					else if(key == "year"){
						var year_min = this.filter_values["year-min"];
						var year_max = this.filter_values["year-max"];
						curr_results[key] = this.generateRandoms(year_min, year_max, num_results);
					}
					else if(key == "mile"){
						var mile_min = this.filter_values["mile-min"];
						var mile_max = this.filter_values["mile-max"];
						curr_results[key] = this.generateRandoms(mile_min, mile_max, num_results);
					}
				}
				console.log("Dataset:\n");
				//console.log(curr_results);
				this.dataset = curr_results;
				console.log(this.dataset);
				//this.results.push(curr_results);
			},
			getSearch:function(){
				console.log(this.results);
				this.show_search_area = false;
				this.show_result_area = true;
				return;
			},
			onSubmit () {
				console.log("Search is clicked.");
				var rows = [];
				var pages = [];
				for (var i=0; i < this.dataset.num; i++) {
					var datas = {};
					datas["name"] = this.dataset.FirstName[i] + " " + this.dataset.LastName[i];
					datas["mile"] = this.dataset.mile[i];
					datas["phone"] = this.dataset.phone[i];
					datas["price"] = this.dataset.price[i];
					datas["title"] = this.dataset.title[i];
					datas["year"] = this.dataset.year[i];
					datas["zip"] = this.dataset.zip;
					datas["email"] = this.dataset.phone[i] +"@gmail.com";
					datas["id"] = i;
					if(i==0){
						console.log("the first datas");
						console.log(datas);
					}
					rows.push(datas);
					if (rows.length == 3 || i == this.dataset.num - 1){
						pages.push(rows);
						rows = [];
					}
					if (pages.length == 7){
						this.results.push(pages);
						pages = [];
					}
					//this.results.push(datas);
				}
				if(pages.length > 0){
					this.results.push(pages);
				}
				this.getSearch();
				this.curr_page_results = this.results[0];
			}
	}
}
</script>