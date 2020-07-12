var vm = new Vue(
    {
        el:"#app",
        data:{
           "search_title":"",
		   "show_search_area":true,
		   "show_result_area":false,
		   "display_results":[],
		   "cur_page":1
        },
        methods:
            {
              search: function(){
				  this.page_change();
				  },
              page_change: function(){
                  let tmp_list = []
                  for(let i=(this.cur_page-1)*10; i < this.cur_page*10; ++i)
                  {
                      if(i % 3 === 0)
                      {
                          tmp_list.push({"Title": this.search_title+ String(i),
                                         "Author": "author-"+ String(i),
                                         "Year": "year-" + String(i)});
                      }
                      if(i % 3 === 1)
                      {
                          tmp_list.push({"Title": this.search_title+ String(i),
                              "Author": "author-"+ String(i),
                              "Publishing house": "company-" + String(i)});
                      }
                      if(i % 3 === 2) {
                          tmp_list.push({
                              "Title": this.search_title+ String(i),
                              "Author": "author-" + String(i),
                              "Download_link": 'link-' + String(i)
                          });
                      }

                  }
                  this.display_results = tmp_list;
              }


            }
    }
)