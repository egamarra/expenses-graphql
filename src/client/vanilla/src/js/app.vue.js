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
      ,
      editExpense: function (ele) {
        console.log(ele);
        this.$parent.mode ='edit';
        this.$parent.expenseEdit = {...ele };
      },deleteExpense: function (item) {
        console.log(item,'deleted');
        
      }
    }
  })
  // Vue.component('expense-form', require('template/form-expense.vue').default);

  Vue.component('expense-form', {
    template: '#expense-template',
    props: {
      entity: Object,
      "list-type-of-expense": Array,
      "list-frecuency-of-expense": Array
    },
    data: function () {
       
      const r = new Expense();
      r.amount = 44;
      return r;
    },
    computed: {
      filteredData: function () {
         
        return this.entity
      }
    },
    filters: {
      capitalize: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1)
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init: function () {
        console.log('mounted form component');
        
      },
      onCancel: function (key) {
         
        this.$parent.cancel( );
      },
      submit: function(){
        console.log('submited',this.entity); 
        this.$parent.save({a:'Edgar'});
        event.preventDefault();
        
      //   axios({
      //     url: '/graphql',
      //     method: 'post',
      //     data: {
      //     query: `mutation saveExpense{  
      //         createExpense(description: "${this.entity.description}"
      //         date: "${this.entity.date}"
      //         typeOfExpense: ${this.entity.typeOfExpense}
      //         frecuencyOfExpense:  ${this.entity.frecuencyOfExpense}
      //         amount: ${this.entity.amount}
      //         ){  
      //         _id   
      //         description  
      //         amount   
      //         date   
      //         }  
      //     }`
      //     }
      // })
      // .then(r => {console.log(r.data);
           
      //     })
      // .catch(function (error) {
      //     console.log(error);
      // });
      }
    }
  })
  
function Expense() {
  return {
    _id:'',
    description:'',
    amount:3.4,
    date:null,
    typeOfExpense:null,
    frecuencyOfExpense:null
  };
}
 
  // bootstrap the demo
  var app = new Vue({
    el: '#root',
    data() 
    {  return {
      showModal: false,
      searchQuery: '',
      mode: 'list',
      listTypeOfExpense:['Alimentation','Transport','Education','Others'],
      listFrecuencyOfExpense: ['Diary','Weekly','Monthly','Yearly'],
      expenseEdit: new Expense(),
      gridColumns: ['_id','frecuencyOfExpense', 'description','amount','date','typeOfExpense','Actions'],
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
                            frecuencyOfExpense
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
        },
        save(a){
          console.log('event save',a);
          console.dir(this.expenseEdit);
        },
        cancel(){
          this.expenseEdit= new Expense()
          this.mode = 'list';
        }
      },
  })
 