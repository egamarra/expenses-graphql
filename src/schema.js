const { gql } = require('apollo-server-express');

const typeDefs = gql`
    # type TypeOfExpense{
    #     _id: String! #It's a string beacause of MongoDB
    #     name: String
    # }

    # type FrecuencyOfExpense{        
    #     _id: String! #It's a string beacause of MongoDB
    #     name: String
    # }
    enum TypeOfExpense {
        Alimentation
        Transport
        Education
        Others
    }

    enum FrecuencyOfExpense {
        Diary
        Monthly
        Yearly
    }
 
    type Expense{
        _id: String! #It's a string beacause of MongoDB
        description: String
        date: String
        typeOfExpense: TypeOfExpense!
        frecuencyOfExpense: FrecuencyOfExpense!
        amount: Float! 
    }

    type Query{
        expenses(description: String): [Expense!]!
        expense(id: String!): Expense!
        typeOfExpenses(typeOfExpense: TypeOfExpense!):[Expense!]!
        frecuencyOfExpenses(frecuencyOfExpense: FrecuencyOfExpense!):[Expense!]!
        numberOfExpenses(typeOfExpense: TypeOfExpense!): Int!
    }

    type Mutation{
        createExpense(            
            description: String
            date: String
            typeOfExpense: TypeOfExpense!
            frecuencyOfExpense: FrecuencyOfExpense!
            amount: Float! 
        ): Expense!

        editExpense(
            _id: String!
            description: String
            date: String
            typeOfExpense: TypeOfExpense!
            frecuencyOfExpense: FrecuencyOfExpense!
            amount: Float! 
        ):Expense

        deleteExpense(_id: String!): Boolean

        # createTypeOfExpense(
        #     name: String        
        # ): Expense!

        # editTypeOfExpense(
        #     _id: String!,
        #     name: String            
        # ): Expense!

        # deleteTypeOfExpense(_id: String!): Boolean

        # createFrecuencyOfExpense(
        #     name: String         
        # ): Expense!

        # editFrecuencyOfExpense(
        #     _id: String!,
        #     name: String
        # ): Expense!

        deleteFrecuencyOfExpense(_id: String!): Boolean
    }

    type Subscription{
        newExpense: Expense!
    }
`;

module.exports = typeDefs;