//import { ObjectId } from 'mongodb';
const ObjectId = require('mongodb');

const expenses = async (parent, args, {Expenses}, info) => {
    if(args.description){
        return await Expenses.find({description: new RegExp(args.description, 'i')})
    }

    return (await Expenses.find().toArray());
}

const expense = async (parent, args, {Expenses}, info) => {
    return await Expenses.finOne({_id: ObjectId(args.id)});
}

const typeOfExpenses = async (parent, args, {Expenses}, info) => {
    if(args.id)
        return (Expenses.find({_id: args.typeOfExpense}));

    return (await Expenses.find().toArray());
}

const frecuencyOfExpenses = async (parent, args, {Expenses}, info) => {
    if(args.id)
        return (Expenses.find({_id: args.frecuencyOfExpenses}));

    return (await Expenses.find().toArray());
}

const numberOfExpenses = async (parent, args, {Expenses}, info) => {
    if(args.typeOfExpense)
        return (Expenses.find({typeOfExpense: args.typeOfExpense})).count();

    return await Expenses.count();
}

 module.exports = 
 {
    expenses,
    expense,
    typeOfExpenses,
    frecuencyOfExpenses,
    numberOfExpenses    
}