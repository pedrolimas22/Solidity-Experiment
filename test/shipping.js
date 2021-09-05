const Shipping = artifacts.require("Shipping");
const truffleAssert = require('truffle-assertions');

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("Shipping", function (/* accounts */) {
  it("should assert true", async function () {
    await Shipping.deployed();
    return assert.isTrue(true);
  });
});

const ShippingStatus= artifacts.require("Shipping");
contract('Shipping', () => {

  it("should return the status Pending", async ()=> {
    // Instance of our deployed contract
    const instance = await ShippingStatus.deployed();
    // Checking the initial status in our contract
    const status = await instance.Status();
    // Checking if the status is initially Pending as set in the constructor
    assert.equal(status, "Pending");
  });
it("should return the status Shipped", async ()=> {
// Instance of our deployed contract
    const instance = await ShippingStatus.deployed();

    // Calling the Shipped() function
    await instance.Shipped();

    // Checking the initial status in our contract
    const status = await instance.Status();

    // Checking if the status is Shipped
    assert.equal(status, "Shipped");
  });

    it("should return the status Delivered", async ()=> {

    // Instance of our deployed contract
    const instance = await ShippingStatus.deployed();

    // Calling the Shipped() function
    await instance.Delivered();

    // Checking the initial status in our contract
    const status = await instance.Status();

    // Checking if the status is Delivered
    assert.equal(status, "Delivered");
  });

  it('should return correct event description', async()=>{

    // Instance of our deployed contract
    const instance = await ShippingStatus.deployed();

    // Calling the Delivered() function
    const delivered = await instance.Delivered();

    // Check event description is correct
    truffleAssert.eventEmitted(delivered, 'LogNewAlert', (event) =>{
      return event.description == 'Your package has arrived';
    });
  });


});

