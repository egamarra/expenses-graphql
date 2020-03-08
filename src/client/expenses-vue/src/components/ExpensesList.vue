<template>
     
<div>
  <!-- <pre>{{data}}</pre> -->
     <div class="row pt-2"  >
      <div class="col-md-12">    
        <div class="card rounded-0">
          <div class="card-header">
              <h3 class="mb-0">List of Expenses</h3>
          </div>
          <div class="card-body">
                <div >
                  <form id="search">
                    <div class="form-group">
                      <label for="query">Search:</label> 
                     <input class="form-control" name="query" v-model="filterKey">
                    </div>
                  </form>
                    
                  <table class = "table table-bordered table-responsive">
                    <thead class = "color-cabecera">
                      <tr>
                        <th v-for="key in columns" :key="key"
                          @click="sortBy(key)"
                          :class="{ active: sortKey == key }">
                          {{ key | capitalize }}
                          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="entry in filteredData" 
                      :key="entry._id">
                
                        <td  >@{{ entry._id }}</td>
                                    <td   > {{ entry.frecuencyOfExpense }}</td>
                                    <td> {{ entry.description }}</td>
                                    <td> {{ entry.amount }}</td>
                                    <td> {{ entry.date }}</td>
                                    <td> {{ entry.typeOfExpense }}</td>
                                    <td  style="white-space: nowrap" class="align-middle ">
                                      <a class="btn color-cabecera" title="Edit"  role="button" @click.prevent="editExpense(entry)" >
                                        <i class=" fa fa-pencil-square-o" style="color:white;" aria-hidden="true"></i>
                                      </a>
                                      <a class="btn color-cabecera" title="Delete" role="button" @click.prevent="deleteExpense(entry._id)" >
                                        <i class=" fa fa-trash" style="color:white;" aria-hidden="true"></i>

                                      </a> 
                                    </td>
                      </tr>
                    </tbody>
                  </table>  

                </div>
          </div>
          <div class="card-footer">
            <a href="/graphql">Graphql query</a>
          </div>
        </div>   
      </div>
  </div>  

</div>

</template>

<script>
// import ExpensesGrid from './ExpensesGrid.vue';
export default {
  props: {
      data: Array,
      columns: Array 
    },
    data(){
        var sortOrders = {}
      this.columns.forEach(function (key) {
        sortOrders[key] = 1
      })
        return {
            title: 'Expenses List',
            filterKey: '',
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
      methods:{
         
        sortBy: function (key) {
        this.sortKey = key
        this.sortOrders[key] = this.sortOrders[key] * -1
        }
        ,
        editExpense: function (ele) {
          console.log('editExpense',ele);
          this.$parent.mode ='edit';
          // this.$parent.expenseEdit = {...ele };
          this.$parent.sendEditFormData(ele);
        },deleteExpense: function (id) {
          console.log(id,'deleted');
          this.confirmDeleteExpense(id);
        },
        confirmDeleteExpense: function(id){
            axios({
            url: '/graphql',
            method: 'post',
            data: {
            query: `mutation removeExpense{                  
                deleteExpense(
                _id: "${id}"                
                )
            }`
            }
        })
        .then(r => {
            console.log('deleted record successfull',r.data);
            //this.$emit('update-expense', Vue.util.extend({},this.entity));
            this.$parent.deleteItemExpense(id);
            })
        .catch(function (error) {
            console.log(error);
        });
        }


      }
}
</script>