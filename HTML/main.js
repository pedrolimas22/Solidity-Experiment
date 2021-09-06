Moralis.initialize("M7NJ9bZG15TvRFuUiiceMegTlDHVwawVD8pjay6Q"); // id da app
Moralis.serverURL = 'https://lwvln3epkhpk.bigmoralis.com:2053/server' // url do moralis
const contractAddress = "0xf722a4a10E460E4A7628A077a2aE98Dc1B131735" // endereço do contrato
const contractAbi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
      }
    ],
    "name": "Accident",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
      }
    ],
    "name": "Breakdown",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bool",
        "name": "available",
        "type": "bool"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "CreateCar",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
      }
    ],
    "name": "ExcessVelocity",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "description",
        "type": "string"
      }
    ],
    "name": "SuddenBreak",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "createVehicle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "delVehicle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "status",
        "type": "bool"
      }
    ],
    "name": "editVehicle",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      }
    ],
    "name": "killRenting",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
let web3;

let contract;

let user;
let userAddress;

var txt = document.getElementById('log');

// Função de inicialização
async function init() {
  web3 = await Moralis.Web3.enable();
  console.log('web3 initialized');

  contract = new web3.eth.Contract(contractAbi, contractAddress); 
  console.log(txt)  
  //const text = ['ol','sf','fadsfads']
  //generate_table();
  //txt.value = "";
  //Moralis.Web3.authenticate().then(function (user) {
    //console.log(user.get('ethAddress'))
  //})
  
} 

// Função de Login com a Metamask
async function login() {
  try {
    await Moralis.Web3.authenticate();
    user = Moralis.User.current();
    console.log(user)
    userAddress = user.get("ethAddress");
      //initUser()
  } catch (error) {
      alert(error)
  }
}

// Função JS de criação do veículo
async function createVehicle() {
  try {
    
    const price = document.getElementById("price").value;
    const receipt = await contract.methods.createVehicle(web3.utils.toWei(price)).send({from: userAddress});
    console.log(receipt)
  } catch(e) {
    console.log(e);
  }
  console.log("À escuta de createVehicle.")
}

// Função JS para eliminar o veículo
async function delVehicle() {
  const idToDelete = document.getElementById("id").value;
  const receipt = await contract.methods.delVehicle(idToDelete).send({from: userAddress});
  console.log(receipt)
  console.log("À escuta de delivered.")
}

// Função JS para edição do veículo
async function editVehicle() {
  const id = document.getElementById("id").value;
  const price = document.getElementById("price").value;
  const status = document.getElementById("available").value;
  const isTrueSet = (status == 'True');
  const receipt = await contract.methods.editVehicle(id, web3.utils.toWei(price), isTrueSet).send({from: userAddress});    
  console.log(receipt)
  console.log("À escuta de status.")
}

// Função JS com query para leitura dos veículos para aluguer
async function getVehiclesToRent() {

  const query = new Moralis.Query("Cars");
  query.equalTo("isAvailable", true);
  const results = await query.find();
  console.log(results)
  // Do something with the returned Moralis.Object values
  
  let carsToRent = [];
  for (let i = 0; i < results.length; i++) {
    carsToRent.push(results[i].attributes)    
  }
  console.log(carsToRent);
  //txt.value += carsToRent;
  generate_table(carsToRent);

}

// Função JS com query para leitura dos veículos em aluguer
async function getVehiclesRented() {

  const query = new Moralis.Query("Cars");
  query.equalTo("isAvailable", false);
  const results = await query.find();

  // Do something with the returned Moralis.Object values
  let carsRented = [];
  for (let i = 0; i < results.length; i++) {
    carsRented.push(results[i].attributes)
      
  }
  console.log(carsRented)
  generate_table(carsRented);
  
}

// Função JS para iniciar o aluger
async function carRenting() {

  const id = document.getElementById("id").value;
  const receipt = await contract.methods.carRenting(id).send({from: userAddress})    
  console.log(receipt)
  console.log("À escuta de status.")
}

// Função JS para terminar o aluger
async function killRenting() {

  const id = document.getElementById("id").value;


  const receipt = await contract.methods.killRenting(id).send({from: userAddress});    
  console.log(receipt)
}


// function showButtons () { 
//     var b0 = document.getElementById("b0")
//         b0.style.display = "block";
//     var b1 = document.getElementById("b1")
//         b1.style.display = "block";
//     var b2 = document.getElementById("b2")
//         b2.style.display = "block";
//     var b3 = document.getElementById("b3")
//         b3.style.display = "block";
//     var b4 = document.getElementById("b4")
//         b4.style.display = "block";
//     var b6 = document.getElementById("b6") 
//         b6.style.display = "block";
// }

// Função JS para a geração de uma tabela dinâmica
function generate_table(arrayToDisplay) {
  // get the reference for the body
  var body = document.getElementsByTagName("table")[0];

  // creates a <table> element and a <tbody> element
  var tbl = document.createElement("table");
  var tblBody = document.createElement("tbody");

  console.log(arrayToDisplay)
  console.log(arrayToDisplay.length)

  var columns = ['uid','price','owner','isAvailable'];
  // creating all cells
  for (var i = 0; i < arrayToDisplay.length+1; i++) {
    // creates a table row
    var row = document.createElement("tr");
  
      for (var j = 0; j < columns.length; j++) {
        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        if(i==0){
          var cell = document.createElement("td");
          var cellText = document.createTextNode(columns[j]);
          cell.appendChild(cellText);
          row.appendChild(cell);
        }else{
          console.log(arrayToDisplay[i-1][columns[j]])
          var cell = document.createElement("td");
          var cellText = document.createTextNode(arrayToDisplay[i-1][columns[j]]);
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
      }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }

  // put the <tbody> in the <table>
  tbl.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tbl);
  // sets the border attribute of tbl to 2;
  tbl.setAttribute("border", "2");
}

init()
