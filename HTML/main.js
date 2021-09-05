Moralis.initialize("M7NJ9bZG15TvRFuUiiceMegTlDHVwawVD8pjay6Q"); // id da app
Moralis.serverURL = 'https://lwvln3epkhpk.bigmoralis.com:2053/server' // url do moralis
const contractAddress = "0x2CfB6F4310600D23693cBd13f043A14835A56Dee"
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
txt.value = "";

init =  async () =>  {
  web3 = await Moralis.Web3.enable();
  console.log('web3 initialized');

  contract = new web3.eth.Contract(contractAbi, contractAddress);   
  //Moralis.Web3.authenticate().then(function (user) {
    //console.log(user.get('ethAddress'))
  //})
  
} 

login = async () => {
  try {
      await Moralis.Web3.authenticate()
      user = Moralis.User.current();
  console.log(user)
    userAddress = user.get("ethAddress");
      //initUser()
  } catch (error) {
      alert(error)
  }
}

function packageStart() {
   
  console.log("created");
}

// packageStart = async () => {
  
//   contract = new web3.eth.Contract(contractAbi, contractAddress);    
//   console.log("created");
// }

async function createVehicle() {
  try{
    
    const price = document.getElementById("price").value;
    const receipt = await contract.methods.createVehicle(web3.utils.toWei(price)).send({from: userAddress});
    console.log(receipt)
  }catch(e){
    console.log(e);
  }
  console.log("À escuta de shipped.")
}

async function delVehicle() {
  const idToDelete = document.getElementById("id").value;
  const receipt = await contract.methods.delVehicle(idToDelete).send({from: userAddress});
  console.log(receipt)
  console.log("À escuta de delivered.")
}

async function editVehicle() {
  const id = document.getElementById("id").value;
  const price = document.getElementById("price").value;
  const status = document.getElementById("available").value;
  const isTrueSet = (status == 'True');
  const receipt = await contract.methods.editVehicle(id, price, isTrueSet).send({from: userAddress});    
  console.log(receipt)
  console.log("À escuta de status.")
}

async function getVehiclesToRent() {

  const query = new Moralis.Query("Cars");
  query.equalTo("available", true);
  const results = await query.find();
  // Do something with the returned Moralis.Object values
  
  let carsToRent = [];
  for (let i = 0; i < results.length; i++) {
    carsToRent.push(results[i].attributes)
    txt.value += carsToRent[i];
  }
  console.log(carsToRent);
  

}

async function getVehiclesRented() {

    const query = new Moralis.Query("Cars");
    query.equalTo("available", false);
    const results = await query.find();

    // Do something with the returned Moralis.Object values
    let carsRented = [];
    for (let i = 0; i < results.length; i++) {
      carsRented.push(results[i].attributes)
      
    }
    console.log(carsToRent)
  
  }

async function carRenting() {

  const id = document.getElementById("id").value;


  const receipt = await contract.methods.carRenting(id).send({from: userAddress});    
  console.log(receipt)
  console.log("À escuta de status.")
}

async function killRenting() {

  const id = document.getElementById("id").value;


  const receipt = await contract.methods.killRenting(id).send({from: userAddress});    
  console.log(receipt)
  console.log("À escuta de status.")
}

function showButtons () { 
    var b0 = document.getElementById("b0")
        b0.style.display = "block";
    var b1 = document.getElementById("b1")
        b1.style.display = "block";
    var b2 = document.getElementById("b2")
        b2.style.display = "block";
    var b3 = document.getElementById("b3")
        b3.style.display = "block";
    var b4 = document.getElementById("b4")
        b4.style.display = "block";
    var b6 = document.getElementById("b6") 
        b6.style.display = "block";
}

init()
