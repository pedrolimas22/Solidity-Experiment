pragma solidity >=0.4.22 <0.8.0;

import "./IERC20.sol";

contract CarRental
{
    struct RentalCar { // Estrutura destinada às credenciais do carro alugado
        uint256 id;
        bool isAvailable; // disponibilidade 
        bool isActive; // 
        uint256 price;
        address owner;
        uint256 activeRentalId;
    }

    struct Rental{ // Estrutura destinada às propriedades do aluguer
        uint256 id; // identificador do aluguer
        uint256 carId; // id do carro
        uint256 price; // preço
        uint256 timeOfRental; // timestamp do inicio do aluguer
        uint256 timeOfDelivery; // timestamp do fim do aluguer
        uint256[] eventsOccured; // eventos ocorridos 
        bool isFinished; // booleana correspondente ao fim do aluguer
    }

    RentalCar[] internal cars; // Inicialização das estruturas
    Rental[] internal rentals; // Inicialização das estruturas
    mapping(uint256 => RentalCar) internal transactionApproved;

    uint32 internal privateId = 0;

    // Events
    event CreateCar(uint256 id, bool isAvailable, bool isActive, uint256 price, address owner, uint256 activeRentalId); // Criação do veículo

    event EditedCar(uint256 id, bool available, uint256 price); // Edição do veículo

    event DeletedCar(uint256 id); // Eliminar um veículo
    
    event RentStarted(uint256 id, uint256 carId, uint256 price, uint256 timeOfRental, uint256 timeOfDelivery,uint256[] eventsOccured, bool isFinished); // Inicialização do contrato de aluguer

    event RentEnded(uint256 id, uint256 carId, uint256 timeOfDelivery,uint256[] eventsOccured, bool isFinished); // Cessação do contrato de aluguer

    event ExcessVelocity(uint256 id, string description); // Evento de alerta de excesso de velocidade

    event SuddenBreak(uint256 id, string description); // Evento de alerta de travagem repentina

    event Accident(uint256 id, string description); // Evento de alerta de acidente

    event Breakdown(uint256 id, string description); // Evento de avaria


    // This initializes our contract state (sets enum to Pending once the program starts)
    constructor () public {

    }
    // Função de criação do veículo
    function createVehicle(uint256 price) public {
        uint256 vehicleId = cars.length;
        RentalCar memory car = RentalCar(
            vehicleId,
            true,
            true,
            price,
            msg.sender, // endereço do owner,
            0
        );
        cars.push(car);
        emit CreateCar(vehicleId, true, true, price, msg.sender, 0); // registar o evento
    }
    
    // Função de eliminar veículo
    function delVehicle(uint256 id) public {
        // Obrigatório para a execução da função
        require(cars[id].isActive == true, "car is inactive");
        require(cars[id].isAvailable == true, "car is unavailable");
        require(msg.sender == cars[id].owner, "not the car's owner");
        
        cars[id].isAvailable = false;
        cars[id].isActive = false;

        emit DeletedCar(id); // registar o evento
    }


    // Função de editar o veículo

    function editVehicle(uint256 id, uint256 price, bool status) public {
        // Obrigatório para a execução da função
        require(cars[id].isActive == true, "car is inactive");
        // require(cars[id].isAvailable == true, "car is unavailable");
        require(msg.sender == cars[id].owner, "not the car's owner");

        cars[id].price = price;
        cars[id].isAvailable = status;

        emit EditedCar(id, status, price);
    }
    
    // Função para iniciar o aluguer
    function carRenting(uint256 id) public payable returns (string memory) {
        // Obrigatório para a execução da função
        require(cars[id].isActive == true, "car is inactive");
        require(msg.sender != cars[id].owner);
        require(msg.value >= cars[id].price);
        require(cars[id].isAvailable == true);
        
        uint256 rentalId = rentals.length;

        Rental memory rental = Rental(
            rentalId,
            id,
            cars[id].price,
            block.timestamp,
            0,
            new uint256[](0),
            false
        );
        rentals.push(rental);
        cars[id].activeRentalId = rentalId;

        payable(address(this)).transfer(cars[id].price); // cast a payable address
        cars[id].isAvailable = false;

        emit RentStarted(rentalId, id, cars[id].price, block.timestamp, 0, new uint256[](0), false); // registar o evento
    }
    
    // Função para terminar o aluguer
    function killRenting(uint256 id) public returns (string memory) { // Função para eliminar o aluguer
        // Obrigatório para a execução da função
        require(cars[id].isActive == true, "car is inactive");
        require(msg.sender == cars[id].owner);
        require(cars[id].isAvailable == false);
        require(!rentals[cars[id].activeRentalId].isFinished);

        rentals[cars[id].activeRentalId].timeOfDelivery = block.timestamp;
        rentals[cars[id].activeRentalId].isFinished = true;

        msg.sender.transfer(cars[id].price);
        cars[id].isAvailable = true; 

        emit RentEnded(cars[id].activeRentalId, id, block.timestamp, rentals[cars[id].activeRentalId].eventsOccured, true);
    }

    // Função para associar os eventos ao veículo alugado
    function emitEvent(uint256 id, string memory description, uint8 eventCode) public{
        // Obrigatório para a execução da função
        require(cars[id].isActive == false, "car is inactive");
        require(!rentals[cars[id].activeRentalId].isFinished);

        if(eventCode == 1){
            emit ExcessVelocity(id, description);
        }else if(eventCode == 2){
            emit SuddenBreak(id, description);
        }else if(eventCode == 3){
            emit Accident(id, description);
        }else if(eventCode == 4){
            emit Breakdown(id, description);
        }
        rentals[cars[id].activeRentalId].eventsOccured.push(eventCode);
    }

}