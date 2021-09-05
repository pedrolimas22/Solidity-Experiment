const HDWalletProvider = require("truffle-hdwallet-provider");
const fs = require("fs");

const dotenv = require('dotenv');

const result = dotenv.config();
if (result.error) {
  throw result.error;
}
module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    networks: {
        development: {
            host: "127.0.0.1", // Localhost (default: none)
            port: 8545, // Standard Ethereum port (default: none)
            network_id: "*" // Any network (default: none)
        },
        ethtest: {
          provider: () => new HDWalletProvider(
            process.env.MNEMONIC,
            `https://speedy-nodes-nyc.moralis.io/72d12511457ce4e3680a9a74/eth/ropsten`
          ),
          network_id: 3,
          confirmations: 5,
          networkCheckTimeout: 100000,
          timeoutBlocks: 500,
          skipDryRun: true
        },
        goerli: {
          provider: () => new HDWalletProvider(
            process.env.MNEMONIC,
            `https://speedy-nodes-nyc.moralis.io/72d12511457ce4e3680a9a74/eth/goerli`
          ),
          network_id: 5,
          confirmations: 5,
          networkCheckTimeout: 1000000,
          timeoutBlocks: 200,
          skipDryRun: true
        },
    },
        
    compilers: {
        solc: {
            version: "0.7.0"
        }
    }
};
