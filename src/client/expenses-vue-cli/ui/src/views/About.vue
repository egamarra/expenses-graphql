<template>
  <div class="about">
    <h1>Development by Ed</h1>
    <div class="row">
      <div class="col-md-6 mx-auto">
  <div style="text-align: justify;"  >
    <pre class="align-left">
    #Graphql

# Write your query or mutation here
query all {
  expenses {
    _id
    description
    date
    typeOfExpense
    frecuencyOfExpense
    amount
  }
}

# Write your query or mutation here
query expenseByType  {
  typeOfExpenses(typeOfExpense:Transport) {
    _id
    description
    date
    typeOfExpense
    frecuencyOfExpense
    amount
  }
}

query expenseByFrecuency  {
  frecuencyOfExpenses(frecuencyOfExpense:Diary) {
    _id
    description
    date
    typeOfExpense
    frecuencyOfExpense
    amount
  }
}

query totalExpenses {
	numberOfExpenses(typeOfExpense:Alimentation)
}



# Create expense
mutation createExpense {
  createExpense(
    description:"Trabajo"
    amount:3.4
    typeOfExpense:Transport
    date:"2020-03-02"
    frecuencyOfExpense:Diary
  ) {
    _id
    description
  }
}
  </pre>
  </div>
  </div>
    </div>
  </div>
  
</template>
