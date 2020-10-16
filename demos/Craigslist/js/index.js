var vm = new Vue(
    {
        el: '#filter_set',
        data:{
			"title": ["Low Mile", "Famous Make", "new model", "Duplex", "Historic"],
			"FirstName": ["Justin", "Reese", "Finch",  "Lionel", "Carter", "James", "Peng", "Step"],
			"LastName": ["Johnson", "John", "Harold", "Joss", "Harden", "Curry", "Huang"],
			"phone": 11,
			"email": "@gmail.com",
			"make": ["Audi", "Ford", "BMW", 'Chevrolet', "Jeep"],
			filter_values: {
				make: "Audi",
				mile_max: "10000",
				mile_min: "2000",
				miles: "2000",
				price_max: "30000",
				price_min: "5000",
				year_max: "2020",
				year_min: "2007",
				zip: "48105",
				keywords: "cars"
			  },
			dataset: [],
			results: [],
			result: null,
			"keyword": "none",
			"show_search_area": true,
			"show_result_area": false,
			show_detailed_area: false,
			curr_page_results:[],
			chosen_page: 0,
			show_sent: false,
			show_phone: false,
			show_email: false,
			show_filter_set: false
		},
        methods: {
			show_details(result){
				this.result = result;
				this.show_result_area = false;
				this.show_detailed_area = true;
			},
			page_nav(page) {
				this.chosen_page = page;
				this.curr_page_results = this.results[this.chosen_page];
			},
			search() {
				//console.log("start generating random results given this filter setting.");
				this.generateResults();
				console.log(this.results);
				this.curr_page_results = this.results[0];
				this.show_search_area = false;
				this.show_result_area = true;
			  },
			  getOneRandom: function(min, max) {
				return Math.floor(Math.random() * (max - min)) + min;
			  },
			  generateRandoms: function(min, max, k) {
				var list_rs = [];
				for (var i = 0; i < k; i++) {
				  var r = this.getOneRandom(min, max);
				  list_rs.push(r);
				}
				return list_rs;
			  },
			  getRandomStr: function(keyword, k) {
				var min = 0;
				var max = 0;
				if (keyword == "title") {
				  // console.log(this.title);
				  max = this.title.length;
				  var valid_list = [];
				  var idxs = this.generateRandoms(min, max, k);
				  for (var i = 0; i < k; i++) {
					var str = this.title[idxs[i]];
					valid_list.push(str);
				  }
				  return valid_list;
				} else if (keyword == "FirstName") {
				  max = this.FirstName.length;
				  var valid_list_this = [];
				  var idx = this.generateRandoms(min, max, k);
				  for (var o = 0; o < k; o++) {
					var str_that = this.FirstName[idx[o]];
					valid_list_this.push(str_that);
				  }
				  return valid_list_this;
				} else if (keyword == "LastName") {
				  max = this.LastName.length;
				  var valid_name = [];
				  var idxs_name = this.generateRandoms(min, max, k);
				  for (var t = 0; t < k; t++) {
					var str_name = this.LastName[idxs_name[t]];
					valid_name.push(str_name);
				  }
				  return valid_name;
				} else if (keyword == "phone") {
				  var max_phone = 9;
				  var k2 = this.phone;
				  var list_strs = [];
				  for (var p = 0; p < k; p++) {
					var list_chars = this.generateRandoms(min, max_phone, k2);
					var str_this = list_chars.join("");
					list_strs.push(str_this);
				  }
				  return list_strs;
				}
			  },
			  generateSearch: function() {
				var list_fs = ["miles", "zip", "price", "make", "year", "mile"];
				var pages = this.getOneRandom(1, 5);
				var num_results = 21 * pages;
				var curr_results = {};
				curr_results["num"] = num_results;
				var list_ts = ["title", "FirstName", "LastName", "phone"];
				var key = null;
				for (var j = 0; j < 4; j++) {
				  key = list_ts[j];
				  var randomValue = this.getRandomStr(key, num_results);
				  curr_results[key] = randomValue;
				}
				for (var i = 0; i < 6; i++) {
				  key = list_fs[i];
				  if (key == "miles" || key == "zip") {
					curr_results[key] = this.filter_values[key];
				  } else if (key == "price") {
					var price_min = this.filter_values["price_min"];
					var price_max = this.filter_values["price_max"];
					curr_results[key] = this.generateRandoms(
					  price_min,
					  price_max,
					  num_results
					);
				  } else if (key == "year") {
					var year_min = this.filter_values["year_min"];
					var year_max = this.filter_values["year_max"];
					curr_results[key] = this.generateRandoms(
					  year_min,
					  year_max,
					  num_results
					);
				  } else if (key == "mile") {
					var mile_min = this.filter_values["mile_min"];
					var mile_max = this.filter_values["mile_max"];
					curr_results[key] = this.generateRandoms(
					  mile_min,
					  mile_max,
					  num_results
					);
				  }
				}
				this.dataset = curr_results;
				this.show_filter_set = true;
				//console.log(this.dataset);
			  },
			  generateResults() {
				//console.log("enter generateResults.");
				var rows = [];
				var pages = [];
				for (var i = 0; i < this.dataset.num; i++) {
				  var datas = {};
				  datas["name"] =
					this.dataset.FirstName[i] + " " + this.dataset.LastName[i];
				  datas["mile"] = this.dataset.mile[i];
				  datas["phone"] = this.dataset.phone[i];
				  datas["price"] = this.dataset.price[i];
				  datas["title"] = this.dataset.title[i];
				  datas["year"] = this.dataset.year[i];
				  datas["zip"] = this.dataset.zip;
				  datas["email"] = this.dataset.phone[i] + "@gmail.com";
				  datas["id"] = i;
				  rows.push(datas);
				  if (rows.length == 3 || i == this.dataset.num - 1) {
					pages.push(rows);
					rows = [];
				  }
				  if (pages.length == 7) {
					this.results.push(pages);
					pages = [];
				  }
				  //this.results.push(datas);
				}
				if (pages.length != 0) {
				  this.results.push(pages);
				  pages = [];
				}
				//console.log(this.results);
				//this.curr_page_results = this.results[0]
			  }
			}
    }
)


