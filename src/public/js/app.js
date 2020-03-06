
async function listExpenseApi()
{
  var query = 'query all{  expenses(description: ""){  _id   description  amount   date typeOfExpense  }  }';
  // const urlLocal = 'http://localhost:4000/graphql';
  // const url = 'https://egamarra-expenses-graphql.herokuapp.com/graphql'
  const url = '/graphql';
  let result = await  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query,
    })
  })
    .then(r => r.json())
    .then(data => {return data.data; })
    .catch(error => {
      console.error(error);
    });

    return result;

}

async function saveExpenseApi(dataForm)
{
  // console.log( 'saving ',dataForm );
  var query = `mutation saveExpense{  
    createExpense(description: "${dataForm.description}"
    date: "${dataForm.date}"
    typeOfExpense: ${dataForm.typeOfExpense}
    frecuencyOfExpense:  ${dataForm.frecuencyOfExpense}
    amount: ${dataForm.amount}
    ){  
      _id   
      description  
      amount   
      date   
    }  
  }`;
   
  const url = '/graphql';
  let result = await  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query,
    })
  })
    .then(r => r.json())
    .then(data => {return data; })
    ;

    return result;

}