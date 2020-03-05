// import { ObjectId } from "mongodb";

const ObjectId = require('mongodb');

const EXPENSE_ADDED = 'EXPENSE_ADDED';
const TYPE_OF_EXPENSE_ADDED = 'TYPE_OF_EXPENSE_ADDED';
const FRECUENCY_OF_EXPENSE_ADDED = 'FRECUENCY_OF_EXPENSE_ADDED';

const createExpense = async (parent, args, {Expenses, pubsub}, info) =>{
    let result = await Expenses.insertOne(args);
    let newExpense = result.ops[0];

    await pubsub.publish(EXPENSE_ADDED, {newExpense});

    return newExpense;
}
const editExpense = async (parent, args, {Expenses}, info) =>{
    const _id = args._id;
    delete args._id;
    await Expenses.updateOne({"_id":ObjectId(_id)}, {$set: args});
    return args;
}

const deleteExpense = async (parent, args, {Expenses}, info) => {
    try {
        Expenses.deleteOne({"_id":ObjectId(_id)});
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

// 2
// const createTypeOfExpense = async (parent, args, {TypeOfExpense, pubsub}, info) =>{
//     let result = await TypeOfExpense.insertOne(args);
//     let newTypeOfExpense = result.ops[0];

//     await pubsub.publish(TYPE_OF_EXPENSE_ADDED, {newTypeOfExpense});

//     return newExpense;
// }
// const editTypeOfExpense = async (parent, args, {TypeOfExpense}, info) =>{
//     const _id = args._id;
//     delete args._id;
//     await TypeOfExpense.updateOne({"_id":ObjectId(_id)}, {$set: args});
//     return args;
// }

// const deleteTypeOfExpense = async (parent, args, {TypeOfExpense}, info) => {
//     try {
//         TypeOfExpense.deleteOne({"_id":ObjectId(_id)});
//         return true;
//     } catch (error) {
//         console.log(error);
//         return false;
//     }
// }

// // 3
// const createFrecuencyOfExpense = async (parent, args, {FrecuencyOfExpense, pubsub}, info) =>{
//     let result = await FrecuencyOfExpense.insertOne(args);
//     let newFrecuencyOfExpense = result.ops[0];

//     await pubsub.publish(FRECUENCY_OF_EXPENSE_ADDED, {newFrecuencyOfExpense});

//     return newExpense;
// }
// const editFrecuencyOfExpense = async (parent, args, {FrecuencyOfExpense}, info) =>{
//     const _id = args._id;
//     delete args._id;
//     await FrecuencyOfExpense.updateOne({"_id":ObjectId(_id)}, {$set: args});
//     return args;
// }

// const deleteFrecuencyOfExpense = async (parent, args, {FrecuencyOfExpense}, info) => {
//     try {
//         FrecuencyOfExpense.deleteOne({"_id":ObjectId(_id)});
//         return true;
//     } catch (error) {
//         console.log(error);
//         return false;
//     }
// }


module.exports = {
    createExpense,
    editExpense,
    deleteExpense,
    // createTypeOfExpense,
    // editTypeOfExpense,
    // deleteTypeOfExpense,
    // createFrecuencyOfExpense,
    // editFrecuencyOfExpense,
    // deleteFrecuencyOfExpense
}