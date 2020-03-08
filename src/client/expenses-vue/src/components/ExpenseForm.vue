<template>
     
<div>{{entity }}
     <div class="card rounded-0 mt-2">
    <div class="card-header">
        <h3 class="mb-0">{{entity._id==undefined ?'Create':'Edit'}} Expense</h3>
    </div>
    <div class="card-body">
          
        <form id="saveExpenseForm"   @submit="submit()">
          <div class="form-group">
            <label for="description">Description:</label> 
            <input type="text" v-model="entity.description" id="description" name="description" class="form-control add-todo" required >
          </div>
          <div class="form-group">
              <label for="amount">Amount:</label> 
              <input type="number" v-model="entity.amount" id="amount" class="form-control add-todo" required name="amount" min="0" value="0" step="0.1">
            </div>
            <div class="form-group">
              <label for="date">Date:</label> 
              <input type="date" id="date" v-model="entity.date" class="form-control add-todo" required name="date" >
            </div>
          <div class="form-group" >
            <label for="typeOfExpense-ddl">Type of expense:</label>
               
              <select required name="typeOfExpense-ddl" v-model="entity.typeOfExpense" class="form-control add-todo">
                <option selected="selected" value="">Choose Type of Expense</option>
                <option v-for="type in listTypeOfExpense" :key="type">{{ type }}</option>
              </select>
            
          </div>
          <div class="form-group" >
              <label for="frecuencyOfExpense-ddl">Frecuency of expense:</label>           
                <select required  name="frecuencyOfExpense-ddl" v-model="entity.frecuencyOfExpense" class="form-control add-todo">
                  <option selected="selected" value="">Choose Frecuency of Expense</option>
                  <option v-for="resource in listFrecuencyOfExpense" :key="resource">{{ resource }}</option>
                </select>
            </div>
          <button type="submit" class="btn color-cabecera">Submit</button>
          <button type="button" @click.prevent="onCancel" class="btn btn-default">Cancel</button>
        </form>
</div>        
</div> 
</div>

</template>

<script>

export default {
     
    data(){
        console.log('data expense form');
        return {
            title: 'Expenses Form',
            listTypeOfExpense:['Alimentation','Transport','Education','Others'],
            listFrecuencyOfExpense: ['Diary','Weekly','Monthly','Yearly'],
            entity: {}
        }
    }, 
    methods: {
        setExpense: function(item) {
            this.entity = Vue.util.extend({}, item)
            // return {
            //     _id:'',
            //     description:'',
            //     amount:3.4,
            //     date:null,
            //     typeOfExpense:null,
            //     frecuencyOfExpense:null
            // };
        },
       onCancel: function (key) {
        this.entity = {};
        this.$parent.cancel( );
      },
      submit: function(){
        
        this.$parent.mode ='list';
        if(this.entity._id){
            this.editExpense();
            
        }else{
            this.saveExpense();
            
        } 
        
        event.preventDefault();  
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
          // this.entity._id = data.data.createExpense._id;
          this.$emit('save-expense', r.data.data.createExpense);
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
            this.$emit('update-expense', Vue.util.extend({},this.entity));
            this.entity = {};
            })
        .catch(function (error) {
            console.log(error);
        });
        }
    }
}
</script>