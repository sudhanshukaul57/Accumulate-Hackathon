import React, { Component } from "react";
import {
  Table,
  Label,
  Grid,
  Button
} from "semantic-ui-react";
import axios from "axios";

class SigSpecId extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          sigDetails: [],
          sigIdComponent: []
        };
    }
    
    getFaucetDetails = () => {
        this.getComponent(false, false, true, false)
    }

    getEthDetails = () => {
        this.setState({
            blockDetailsFlag: true,
            transactionsFlag: false
        })
        this.getComponent(true, false, false, false)
    }

    getComponent = (ethFlag, blockDetailsFlag, faucetFlag, transactionDetailsFlag) => {
        this.props.getComponent(ethFlag, blockDetailsFlag, faucetFlag, transactionDetailsFlag)
    }

    componentDidMount = () => {
        this.getBlocks();
    };

    getBlocks = async () => {
        const sigIdUrl = this.props.sigIdUrl
        const endpoint = `https://testnet.accumulatenetwork.io/v1`;
        const requestBody = {
            "jsonrpc": "2.0",
            "id": 0,
            "method": "sig-spec",
            "params": {
                "url": sigIdUrl
            }
        }
        const sigDetails = await axios.post(
            endpoint, requestBody
        )
        this.setState({
            sigDetails: sigDetails.data.result
        })
        let timeStamp = Date.now()
        let currentTime = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timeStamp)

        let sigIdComponent = []
        console.log("Response value is ", this.state.sigDetails)
        sigIdComponent.push(
                    <Table fixed>
                        <Table.Header>
                            <Table.Row>
                            <Table.Cell style={{ color: "#1d6fa5" }}>
                                <h3>Signature ID URL</h3>
                            </Table.Cell>

                            <Table.Cell style={{ color: "#1d6fa5" }}>
                                <h3>{this.state.block.data.url}</h3>
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
                                    {this.state.block.type}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label color="blue">Merkle State Count</Label>
                                </Table.Cell>
                                <Table.Cell>
                                    {this.state.block.merkleState.count}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label color="blue">Roots</Label>
                                </Table.Cell>
                                <Table.Cell>
                                {this.state.block.merkleState.roots[0]}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label color="blue">Token Url</Label>
                                </Table.Cell>
                                <Table.Cell>
                                {this.state.block.data.tokenUrl}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label color="blue">Balance</Label>
                                </Table.Cell>
                                <Table.Cell>
                                {this.state.block.data.balance}
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label color="blue">Transaction Count</Label>
                                </Table.Cell>
                                <Table.Cell>
                                <a href="#" onClick={this.getTransactions}>{this.state.block.data.txCount}</a>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
        )

        this.setState({
            blockComponent: blockDetails
        })
    }
    render(){
        console.log("Url value is ", this.props.blockDetailUrl)
        return (
            (this.state.transactionsFlag && <TransactionList blockUrl = {this.props.blockDetailUrl} getEthDetails={this.getEthDetails}/>)||(this.state.blockDetailsFlag && <Grid>
                <Grid.Row>
                    <Button  color="blue" onClick={this.getEthDetails}>Home</Button> 
                </Grid.Row>
                <Grid.Row>{this.state.blockComponent}</Grid.Row>
                <Grid.Row>
                    <Button  color="blue" onClick={this.getFaucetDetails}>Faucet</Button> 
                </Grid.Row>
            </Grid>)
          );
    }
}

export default SigSpecId;