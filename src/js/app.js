import token_artifacts from '../../build/contracts/Token.json';




var web3;
var accounts;
var contract;
var truffleDevRpc = 'http://127.0.0.1:7545/';
var truffleDevContractAddress = '';

window.App = {
  start: function() {
    contract = web3.eth.contract(token_artifacts.abi)
      .at(truffleDevContractAddress);

    // Get the initial accounts
    web3.eth.getAccounts(function(err, accs) {
      if (err !== null || accs.length === 0) {
        alert(
          'There was an error fetching your accounts. ' 
          );
        return;
      }

      accounts = accs;
      owner = accounts[0];
    });
  },

  setTransferStatus: function(message) {
    transferStatus.innerText = message;
  },

  

  balanceOf: function() {
    var address = walletAddress.value;
    var walletWei = contract.balanceOf.call(address, function(error, balance) {
      if (error) {
        window.App.setTransferStatus('Error: ' + error);
      } else {
        // Balance is in wei. If your token doesn't have 18 decimal places,
        // you will need to write your own conversion.
        var walletToken = web3.fromWei(balance, 'ether');
        balanceLabel.innerText = walletToken.toString();
      }
    });
  },

  transfer: function() {
    // Go from ether to wei denomination. If your token doesn't have 18 
    // decimal places, you will need to write your own conversion.
    var amountToken = transferAmount.value;
    var amount = web3.toWei(amountToken);

    var sender = transferFromAddress.value;
    var receiver = transferToAddress.value;

    var element = document.getElementById("senddb");
    element.onclick = function(senddb) {
      console.log(senddb);
    }
  

    window.App.setTransferStatus('Initiating transaction... (please wait)');

    contract.transfer(
      receiver,
      amount,
      {from: sender},
      function(error, transactionHash) {
        if (error) {
          window.App.setTransferStatus('Error: ' + error);
        } else {
          window.App.setTransferStatus('Transaction complete!');
        }
    });
  },

 

    Coindb.publish(publishConfig, function(status, response) {
      console.log(status, response);
      if (status.error) {
        console.error(status.error);
        window.App.setSmsStatus(
          'Error while texting the crowd, see developer console.'
        );
      } else {
        window.App.setSmsStatus(
          'The crowd has been notified with SMS via ClickSend.'
        );
      }
    }),
  }
},

window.addEventListener('load', function() {
  let providerURI = truffleDevRpc;
  let web3Provider = new Web3.providers.HttpProvider(providerURI);
  web3 = new Web3(web3Provider);

  App.start();
});

var walletAddress = document.getElementById('walletAddress');
var balanceButton = document.getElementById('balanceButton');
var balanceLabel = document.getElementById('Balance');
var transferFromAddress = document.getElementById('transferFromAddress');
var transferToAddress = document.getElementById('transferToAddress');
var transferAmount = document.getElementById('transferAmount');
var transferButton = document.getElementById('transferButton');
var transferStatus = document.getElementById('transferStatus');


balanceButton.onclick = window.App.balanceOf;
transferButton.onclick = window.App.transfer;