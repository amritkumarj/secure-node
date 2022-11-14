var express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const { tronToEthAddress, relayTransaction } = require("./relay");
var app = express();
app.use(cors())

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(80, () => {
 console.log("Server running on port 80");
});
        
app.listen(443, () => {
    console.log("Server running on port 443");
});

app.post("/", (req, res) => {
    // console.log("Method called is -- ", req.method)
    // console.log(req.body['signTrx'])
    try{
        relayTransaction(req.body['signTrx'], req.body['data'], req.body['signer'], req.body['address'])
    }catch(e){
    }
    res.end()
 })