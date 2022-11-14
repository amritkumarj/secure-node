
const TronWeb = require("tronweb")
require('dotenv').config();

const HttpProvider = TronWeb.providers.HttpProvider;

const fullNode = new HttpProvider("https://nile.trongrid.io");
const solidityNode = new HttpProvider("https://nile.trongrid.io");
const eventServer = new HttpProvider("https://nile.trongrid.io");



const validatorAddress = "TAcL375RgSFT17wmEUvQNViopofRMJnS9Y";
const validatorPrivateKey = process.env.VALIDATOR_PRIVATE_KEY;
 const secureContractAddress = "THT2qUHqnY1icKAFd3hVZz4wwXQTUKfRNQ";


const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, validatorPrivateKey);
const ADDRESS_PREFIX_REGEX = /^(41)/;

 const tronToEthAddress = (address) => {
    return tronWeb.address
          .toHex(address)
          .replace(ADDRESS_PREFIX_REGEX, "0x")
}

 const relayTransaction = async (signTrx, data, signer, sTokenAddress) => {

    console.log(data)
    console.log(signTrx)
    var parameter = [
        { type: "address", value: tronToEthAddress(signer) },
        { type: "address", value: tronToEthAddress(sTokenAddress) },
        { type: "bytes", value: data },
        { type: "bytes", value: signTrx }
      ];
      var options = {
        feeLimit: 100000000,
        callValue: 0
      };

      console.log(tronWeb.address.toHex(secureContractAddress))
      const {transaction} = await tronWeb.transactionBuilder.triggerSmartContract(
        secureContractAddress,
        "secureCall(address,address,bytes,bytes)",
        options,
        parameter,
        validatorAddress
      );

      const signedtxn = await tronWeb.trx.sign(transaction);
      
      const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);
      
}

module.exports = {tronToEthAddress, relayTransaction}