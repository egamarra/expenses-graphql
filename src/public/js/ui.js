window.onload = function() {
    getFrecuencyOfExpense();
    getTypeOfExpense();
    populateTableExpenses();
  };

function getFrecuencyOfExpense() {
    const frecuencyList = getDataFrecuencyOfExpense();
    populateGenericDropdown('frecuencyOfExpense-ddl',frecuencyList);     
}
 
function getTypeOfExpense() {
    const typeList = getDataTypeOfExpense(); 
    populateGenericDropdown('typeOfExpense-ddl',typeList);
}

function getDataTypeOfExpense(){
    return {
        selectText:'Choose Type of Expense',
        data:['Alimentation','Transport','Education','Others']
    };
}

function getDataFrecuencyOfExpense(){
    return {
        selectText:'Choose Frecuency of Expense',
        data:['Diary','Weekly','Monthly','Yearly']
    };
}

function populateGenericDropdown(id, source){
    let dropdown = document.getElementById(id);
    dropdown.length = 0;

    let defaultOption = document.createElement('option');
    defaultOption.text = source.selectText;
    defaultOption.value ='';

    dropdown.add(defaultOption);
    dropdown.selectedIndex = 0;
     
    let option; 
      
    for (let i = 0; i < source.data.length; i++) {
        option = document.createElement('option');
        option.text = source.data[i];
        option.value = source.data[i];
        dropdown.add(option);
      }
}



document.querySelector("#saveExpenseForm").addEventListener("submit", function(e){
        var formEl = document.forms.saveExpenseForm;
        e.preventDefault();    //stop form from submitting
        var formData = new FormData(formEl);

        saveExpense(formData);

        populateTableExpenses();
        
        
});

function saveExpense(formData) {
    var dataSend = {
        description : formData.get('description'),
        amount : formData.get('amount'),
        typeOfExpense : formData.get('typeOfExpense-ddl'),
        frecuencyOfExpense : formData.get('frecuencyOfExpense-ddl'),
        date : formData.get('date')
    };
    
    // console.log('submited',dataSend);

    const promiseSave = saveExpenseApi(dataSend);
    promiseSave.then(data => console.log('saved',data))
    .catch(error => {
      console.error(error);
    });;
}

function populateTableExpenses() {
    const promise = listExpenseApi();

        promise.then(data => {
            constructTable(data.expenses);
            console.log('lista all',data); })
        .catch(error => {
          console.error(error);
        });;
}


function generateTableHead(table, data) {
    let thead = table.createTHead();
    thead.classList.add('color-cabecera');
    let row = thead.insertRow();
    for (let key of data) {
      let th = document.createElement("th");
      
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }

  function generateTable(table, data) {
    for (let element of data) {
      let row = table.insertRow();
      for (key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  }

  function clearElement(myNode ){
    while (myNode.lastElementChild) {
        myNode.removeChild(myNode.lastElementChild);
      }
  }

  function constructTable(source){
        let table = document.querySelector("#list-expenses");
        clearElement(table);
        let data = Object.keys(source[0]);
        generateTableHead(table, data);
        generateTable(table, source);
  }