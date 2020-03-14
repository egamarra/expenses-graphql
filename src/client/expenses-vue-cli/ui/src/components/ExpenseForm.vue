<template>
     
<div class="row" align="center">
   <!-- <div class="col-md-3">

   </div> -->
  <div class="col-md-6 mx-auto">
     <div class="card rounded-0 mt-2">
    <div class="card-header">
        <h3 class="mb-0">{{title}}</h3>
    </div>
    <div class="card-body">
          <!-- novalidate  validation in javascript -->
        <form id="saveExpenseForm" @submit="submit()" >
          <div class="form-group">
            <label for="description">Description:</label> 
            <input tabindex="0"  type="text" v-model="entity.description" id="description" name="description" class="form-control" required >
          </div>
          <div class="form-group">
              <label for="amount">Amount:</label> 
              <input tabindex="1"  type="number" v-model="entity.amount" id="amount" class="form-control" required name="amount" min="0" value="0" step="0.1">
            </div>
            <div class="form-group">
              <label for="date">Date:</label> 
              <input tabindex="2" required type="date" id="date" v-model="entity.date" class="form-control" name="date" >
            </div>
          <div class="form-group" >
            <label for="typeOfExpense-ddl">Type of expense:</label>
               
              <select tabindex="3"  required name="typeOfExpense-ddl" v-model="entity.typeOfExpense" class="form-control">
                <option selected="selected" value="">Choose Type of Expense</option>
                <option v-for="type in listTypeOfExpense" :key="type">{{ type }}</option>
              </select>
            
          </div>
          <div class="form-group" >
              <label for="frecuencyOfExpense-ddl">Frecuency of expense:</label>           
                <select tabindex="4"  required  name="frecuencyOfExpense-ddl" v-model="entity.frecuencyOfExpense" class="form-control">
                  <option selected="selected" value="">Choose Frecuency of Expense</option>
                  <option v-for="resource in listFrecuencyOfExpense" :key="resource">{{ resource }}</option>
                </select>
            </div>
          <button tabindex="5"  type="submit" class="btn color-cabecera mr-1">Submit</button>
          <button tabindex="6"  type="button" @click.prevent="onCancel" class="btn color-cabecera">Cancel</button>
        </form>
    </div>        
    </div> 
  </div>
</div>

</template>

<script>
import axios from 'axios'
// import router from './router'

export default {
     
    data(){
        console.log('data expense form');
        return {
            title: 'Create Expense',
            listTypeOfExpense:['Alimentation','Transport','Education','Others'],
            listFrecuencyOfExpense: ['Diary','Weekly','Monthly','Yearly'],
            entity: {description:null}
        }
    },
    async created () { 
      let expenseData = this.$route.params.expense; 
      if(expenseData){
        this.entity = expenseData;
        this.title = 'Edit Expense';
      }        
    }
    , 
    methods: { 
       onCancel: function (key) {
        this.entity = {};
        this.$router.push({ name: "Home"}); 
      },
      submit: function(){
         
        if(this.entity._id){
            this.editExpense();            
        }else{
            this.saveExpense();            
        } 
        
        event.preventDefault(); 
        this.$router.push({ name: "Home"}); 
      },
      saveExpense: function () {
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
              date
              typeOfExpense  
              frecuencyOfExpense
              amount             
              }  
          }`
          }
      }).then(r => {
          console.log('new record successfull',r.data.data.createExpense);           
          this.entity = {}; 
      })
      .catch(function (error) { console.log(error); });

      },
        editExpense: function(){
            axios({
            url: '/graphql',
            method: 'post',
            data: {
            query: `mutation updateExpense{                  
                editExpense(
                _id: "${this.entity._id}"
                description: "${this.entity.description}"
                date: "${this.entity.date}"
                typeOfExpense: ${this.entity.typeOfExpense}
                frecuencyOfExpense:  ${this.entity.frecuencyOfExpense}
                amount: ${this.entity.amount}
                ){
                description 
                date
                typeOfExpense  
                frecuencyOfExpense
                amount       
                }  
            }`
            }
        })
        .then(r => {
            console.log('update record successfull',r.data);            
            this.entity = {};
            })
        .catch(function (error) {
            console.log(error);
        });
        }
    }
}
</script>