<template>
    
<div>
    
        <div class="container-fluid p-2">
        <div class="jumbotron p-2 mb-2">
            <h1 class="display-4"> {{title}}</h1>
            </div>
        <button v-if="mode =='list'" id="show-edit" class="btn color-cabecera " @click="mode  = 'edit'">Create</button>

        <div class="pt-2" v-show="mode =='list'">
            <ExpensesList
            :data="expenseList"
            :columns="expenseColumns"></ExpensesList>
        </div>  
            
            <div class="pt-2" v-show="mode =='edit'">
            <ExpenseForm ref="childComponent"
            @update-expense="updateItemExpense"
            @save-expense="addItemExpenses"
            ></ExpenseForm>
        </div>
    
    </div>
</div>
</template>

<script>
import ExpensesList from './ExpensesList.vue';
import ExpenseForm from './ExpenseForm.vue'

export default {
    data(){
        return {
            title: 'Expenses App',
            mode: 'list',
            expenseColumns:['_id','frecuencyOfExpense', 'description','amount','date','typeOfExpense','Actions'],
            expenseList: []         
        }
    },
    components: {
    ExpensesList,
    ExpenseForm
  },
  mounted() {
      this.getAllExpenses();
  },
  methods:{
    cancel(){          
          this.mode = 'list';
    },
    sendEditFormData (item) {
        this.$refs.childComponent.setExpense(item);
    },
    addItemExpenses(item){
        console.log('addItemExpenses',item);
         
        this.expenseList.push(item);
    },
    updateItemExpense(item){
        console.log('updateItemExpense',item);
        
        if(item && item._id){
           const index= this.expenseList.findIndex(x => x._id == item._id);
           
           if(index>=0){ 
               Vue.set(this.expenseList, index, item);
            //    this.expenseList[index] =item; esto no es reactivo
           }
        }
    },
    deleteItemExpense(_id){
        console.log('deleteItemExpense',_id);
        
        if(_id){
           const index= this.expenseList.findIndex(x => x._id == _id);
           
           if(index>=0){ 
               this.expenseList.splice(index, 1);
           }
        }
    },
    getAllExpenses(){

            console.log('populated list of expenses'); 
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
              .then(r => {console.log(r.data.data.expenses);
                  this.expenseList = r.data.data.expenses || []; 
                })
              .catch(function (error) {                  
                console.log(error);
              });
    }
  }
}
</script>