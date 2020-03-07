// no used
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