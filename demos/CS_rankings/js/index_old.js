var vm2 = new Vue(
    {
        el: '#app',
        data:{
            checkedFields:[],
            Directions :[
                { 
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
                    name : 'Systems',
                    on_id : 'sys_area_on',
                    off_id : 'sys_area_off',
                    fields:[
                        { name : 'Computer architecture'},
                        { name : 'Computer networks'},
                        { name : 'Databases'}
                    ]
                }
            ],
            output:[]
        },
        methods: {
            check: function(e){
                console.log(this.checkedFields);
                fetch('./data/rankings.json')
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        var i = 0;
                        for(i=0; i < this.checkedFields.length;i++){
                            var field = this.checkedFields[i];
                            this.output.push(data[field]);
                        }
                    })
            }
        }
    }
)