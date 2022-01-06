import React, { Component } from "react";
import {
  Table,
  Label,
  Grid,
  Button
} from "semantic-ui-react";
import axios from "axios";
import TransactionDetails from ".";

class TransactionList extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          transactions: [],
          transactionDetailsFlag: false,
          transactionListFlag: true,
          transactionId: ""
        };
    }

    getComponent = (e) => {
        this.setState({
            transactionDetailsFlag : true,
            transactionListFlag : false,
            transactionId : e.target.text
        })
    }

    getTransactionsList = async () => {
        const blockUrl = this.props.blockUrl
        console.log("Url Value inside Transaction list is ", blockUrl)
        const endpoint = `https://testnet.accumulatenetwork.io/v1`;
        const requestBody = {
            "jsonrpc": "2.0",
            "id": 0,
            "method": "token-account-history",
            "params": {
                "url": blockUrl
            }
        }
        const blockDetail = await axios.post(
            endpoint, requestBody
        )
        console.log("BlockDetail Value is ", blockDetail)
        const transactions  = blockDetail.data.result.data;

        let txsDetails = []

        for (let i = 0; i < transactions.length; i = i + 1) {
            if(!(transactions[i].type == "syntheticDepositTokens" || transactions[i].type == "sendTokens")){
                continue
            }
            let toValue  = transactions[i].data.to
            let amount = transactions[i].data.amount
            console.log("Object type is", typeof(transactions[i].data.to))
            if(typeof(transactions[i].data.to) == "object"){
                toValue  = transactions[i].data.to[0].url
                console.log("To url value is ", toValue)
            }
            if(amount == undefined){
                amount = transactions[i].data.to[0].amount
            }
            console.log("ith value is ",i)
            console.log("Transaction value is", transactions[i])
            const tx = transactions[i];
            txsDetails.push(
              <Table.Row key={i}>
                <Table.Cell>
                  <Label color="blue">Tx</Label> <a href="#" onClick={this.getComponent}>{tx.data.txid}</a>
                </Table.Cell>
                <Table.Cell>
                  From {tx.data.from} <br></br>
                  To {toValue}
                </Table.Cell>
                <Table.Cell>
                  {" "}
                  <Label color="blue">Balance</Label> {amount}
                </Table.Cell>
              </Table.Row>
            );
          }

          this.setState({
              transactions: txsDetails
          })
    }


    componentDidMount = () => {
        this.getTransactionsList();
    }

    render(){
        let timeStamp = Date.now()
        let currentTime = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timeStamp)
        return (
            (this.state.transactionDetailsFlag && <TransactionDetails getComponent={this.props.getEthDetails} transactionUrl={this.state.transactionId}/>) || (this.state.transactionListFlag && <div>
                <Grid>
                    <Grid.Row>
                        <Button  color="blue" onClick={this.props.getEthDetails}>Home</Button> 
                    </Grid.Row>
                    <Grid.Row>
                        <Table fixed>
                            <Table.Header>
                                <Table.Row>
                                <Table.Cell style={{ color: "#1d6fa5" }}>
                                    <h3> Transactions</h3>
                                </Table.Cell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>{this.state.transactions}</Table.Body>
                        </Table>
                    </Grid.Row>
                </Grid>
            </div>)
          );
    }
}

export default TransactionList;