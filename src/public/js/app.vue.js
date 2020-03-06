// register the grid component
Vue.component('demo-grid', {
    template: '#grid-template',
    props: {
      data: Array,
      columns: Array,
      filterKey: String
    },
    data: function () {
      var sortOrders = {}
      this.columns.forEach(function (key) {
        sortOrders[key] = 1
      })
      return {
        sortKey: '',
        sortOrders: sortOrders
      }
    },
    computed: {
      filteredData: function () {
        var sortKey = this.sortKey
        var filterKey = this.filterKey && this.filterKey.toLowerCase()
        var order = this.sortOrders[sortKey] || 1
        var data = this.data
        if (filterKey) {
          data = data.filter(function (row) {
            return Object.keys(row).some(function (key) {
              return String(row[key]).toLowerCase().indexOf(filterKey) > -1
            })
          })
        }
        if (sortKey) {
          data = data.slice().sort(function (a, b) {
            a = a[sortKey]
            b = b[sortKey]
            return (a === b ? 0 : a > b ? 1 : -1) * order
          })
        }
        return data
      }
    },
    filters: {
      capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
    },
    methods: {
      sortBy: function (key) {
        this.sortKey = key
        this.sortOrders[key] = this.sortOrders[key] * -1
      }
    }
  })
  
  // bootstrap the demo
  var demo = new Vue({
    el: '#demo',
    data() 
    {  return {
      searchQuery: '',
      gridColumns: ['_id', 'description','amount','date','typeOfExpense'],
      gridData: [        
      ]
    }},
    mounted () {
        this.init()
      },
      methods:{
        init(){
             
            axios({
                url: '/graphql',
                method: 'post',
                data: {
                  query: `
                    query all {
                        expenses(description: "") {
                            _id
                            description 
                            amount
                            date
                            typeOfExpense
                        }
                      }
                    `
                }
              })
              //.then(r => r.json())
              .then(r => {console.log(r.data.data.expenses);
                  this.gridData = r.data.data.expenses; 
                })
              .catch(function (error) {
                console.log(error);
              });
        } 
      },
  })


  var entity = new Vue({
    el: '#expense',
    data() 
    {  return {
        entity: {
            _id: '',
            description: ['_id', 'description','amount','date','typeOfExpense'],
            amount: 0,
            date: null,
            typeOfExpense: null,
            frecuencyOfExpense: null
        }
    }
    },
    methods:{        
        save(){             
                axios({
                    url: '/graphql',
                    method: 'post',
                    data: {
                    query: `mutation saveExpense{  
                        createExpense(description: "${this.entity.description}"
                        date: "${this.entity.date}"
                        typeOfExpense: ${this.entity.typeOfExpense}
                        frecuencyOfExpense:  ${this.entity.frecuencyOfExpense}
                        amount: ${this.entity.amount}
                        ){  
                        _id   
                        description  
                        amount   
                        date   
                        }  
                    }`
                    }
                })
                .then(r => {console.log(r.data);
                     
                    })
                .catch(function (error) {
                    console.log(error);
                });
        }
      },
  })

  