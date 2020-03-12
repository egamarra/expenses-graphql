# expenses-graphql
Store Expenses in MongoDB using graphql and Node
#Graphql

#running in develpment mode for use playground

#node version 12.13.0
#package json add  "type": "module"


rename .env_temp to .env

# .env ======
PORT=4000
MONGODB_URI=mongodb://user:password@localhost:27017
MONGODB_DB=bdmongo
MONGODB_COLLECTION=collection

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
    amount:3.40
    typeOfExpense:Transport
    date:"2020-03-02"
    frecuencyOfExpense:Diary
  ) {
    _id
    description
  }
}

# feature deploy

you can use mongo atlas or mongo over docker