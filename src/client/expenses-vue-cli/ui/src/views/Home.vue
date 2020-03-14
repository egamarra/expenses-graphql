<template>
  <div class="home container-fluid">
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <ExpensesList
            :data="expenseList"
            :columns="expenseColumns"></ExpensesList>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
   import ExpensesList from "@/components/ExpensesList";
   import axios from "axios";

export default {
  name: 'Home',
  data(){ 
    return {
      expenseColumns:['_id','frecuencyOfExpense', 'description','amount','date','typeOfExpense','Actions'],
      expenseList: [] 
    };    
  },
  components: {
    // HelloWorld,
    ExpensesList
  },
  mounted() {
      this.getAllExpenses();
  },
  methods:{
    // cancel(){          
    //       this.mode = 'list';
    // },
    // sendEditFormData (item) {
    //     this.$refs.childComponent.setExpense(item);
    // },
    // addItemExpenses(item){
    //     console.log('addItemExpenses',item);
         
    //     this.expenseList.push(item);
    // },
    // updateItemExpense(item){
    //     console.log('updateItemExpense',item);
        
    //     if(item && item._id){
    //        const index= this.expenseList.findIndex(x => x._id == item._id);
           
    //        if(index>=0){ 
    //            Vue.set(this.expenseList, index, item);
    //         //    this.expenseList[index] =item; esto no es reactivo
    //        }
    //     }
    // },
    // deleteItemExpense(_id){
    //     console.log('deleteItemExpense',_id);
        
    //     if(_id){
    //        const index= this.expenseList.findIndex(x => x._id == _id);
           
    //        if(index>=0){ 
    //            this.expenseList.splice(index, 1);
    //        }
    //     }
    // },
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
