const EXPENSE_ADDED = 'EXPENSE_ADDED';

const newExpense = {
    suscribe: (parent,args,context,info) => context.pubsub.asyncIterator(EXPENSE_ADDED)
}

module.exports = {
    newExpense
}