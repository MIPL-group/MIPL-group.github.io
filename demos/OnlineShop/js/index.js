var vm = new Vue(
    {
        el:"#app",
        data:{
            main_step_progress : 0,
            tab_active_tab: 'tab_user_info',
            order_form: {
                name:'',
                address:'',
                tmp_product_id:'',
                tmp_product_name:'',
                tmp_product_count: 1,
                tmp_product_type:'',
                products:[]
            },
            order_form_rules: {
                //currently no rules
            }
        },
        methods:
            {
                change_tab:function(tab,progress){
                    this.tab_active_tab = tab
                }
            }
    }
)