import React, { Component } from "react";
import {
  Table,
  Label,
  Grid,
  Button
} from "semantic-ui-react";
import axios from "axios";

class TransactionDetails extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          transactionDetail: [],
          transactionComponent: []
        };
    }

    getTransactions = async () => {
        const transactionUrl = this.props.transactionUrl
        console.log("Transaction url value is ", transactionUrl)
        const endpoint = `https://testnet.accumulatenetwork.io/v1`;
        const requestBody = {
            "jsonrpc": "2.0",
            "id": 0,
            "method": "token-tx",
            "params": {
                "hash": transactionUrl
            }
        }
        const transactionDetail = await axios.post(
            endpoint, requestBody
        )

        this.setState({
            transactionDetail: transactionDetail.data.result
        })

        let timeStamp = Date.now()
        let currentTime = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timeStamp)
        
        let transactionComponent = []
        console.log("Transaction value is ",transactionDetail)
        transactionComponent.push(
            <Table fixed>
                        <Table.Header>
                            <Table.Row>
                            <Table.Cell style={{ color: "#1d6fa5" }}>
                                <h3>Transaction Details</h3>
                            </Table.Cell>

                            <Table.Cell style={{ color: "#1d6fa5" }}>
                                <h3>{this.state.transactionDetail.txid}</h3>
                            </Table.Cell>
                            </Table.Row>
                        </Table.Header>
                
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>
                                    <Label color="blue">Timestamp</Label>
                                </Table.Cell>
                                <Table.Cell>
                                    {currentTime} 
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label color="blue">Account Type</Label>
                                </Table.Cell>
                                <Table.Cell>
                                    {this.state.transactionDetail.type}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label color="blue">Sender URL</Label>
                                </Table.Cell>
                                <Table.Cell>
                                    {this.state.transactionDetail.data.from}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label color="blue">Receiver URL</Label>
                                </Table.Cell>
                                <Table.Cell>
                                    {this.state.transactionDetail.data.to[0].url}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label color="blue">Receiver Transaction ID</Label>
                                </Table.Cell>
                                <Table.Cell>
                                    {this.state.transactionDetail.data.to[0].txid}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label color="blue">Amount</Label>
                                </Table.Cell>
                                <Table.Cell>
                                    {this.state.transactionDetail.data.to[0].amount}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label color="blue">Sponsor</Label>
                                </Table.Cell>
                                <Table.Cell>
                                    {this.state.transactionDetail.sponsor}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label color="blue">Signer Public Key</Label>
                                </Table.Cell>
                                <Table.Cell>
                                    {this.state.transactionDetail.signer.publicKey}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label color="blue">Siganture ID</Label>
                                </Table.Cell>
                                <Table.Cell>
                                {this.state.transactionDetail.sig}
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
        )
        this.setState({
            transactionComponent: transactionComponent
        })
    }
    getEthDetails = () => {
        this.getComponent(true, false, false, false)
    }

    getComponent = (ethFlag, blockDetailsFlag, faucetFlag, transactionDetailsFlag) => {
        this.props.getComponent(ethFlag, blockDetailsFlag, faucetFlag, transactionDetailsFlag)
    }

    componentDidMount = () => {
        this.getTransactions();
    };

    render(){
        let timeStamp = Date.now()
        let currentTime = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timeStamp)
        return (
            <Grid>
                <Grid.Row>
                    <Button  color="blue" onClick={this.getEthDetails}>Home</Button> 
                </Grid.Row>
                <Grid.Row>{this.state.transactionComponent}</Grid.Row>
            </Grid>
          );
    }
}

export default TransactionDetails;