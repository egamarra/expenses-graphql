<template>
  <div class="new-expense container">
      
    <ExpenseForm ></ExpenseForm>
  </div>
</template>

<script>
// @ is an alias to /src 
   import ExpenseForm from "@/components/ExpenseForm";
   

export default {
  name: 'Expense',
  components: {     
    ExpenseForm
  },
}
</script>
