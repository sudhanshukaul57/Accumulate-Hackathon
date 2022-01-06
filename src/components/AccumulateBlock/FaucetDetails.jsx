import React, { Component } from "react";
import {
  Table,
  Label,
  Grid,
  Button
} from "semantic-ui-react";

class FaucetDetails extends React.Component{

    getEthDetails = () => {
        this.getComponent(true, false, false, false)
    }

    getComponent = (ethFlag, blockDetailsFlag, faucetFlag,transactionDetailsFlag) => {
        this.props.getComponent(ethFlag, blockDetailsFlag, faucetFlag, transactionDetailsFlag)
    }
    

    render(){
        let timeStamp = Date.now()
        let currentTime = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timeStamp)
        return (
            <Grid>
                <Grid.Row>
                    <Button  color="blue" onClick={this.getEthDetails}>Home</Button> 
                </Grid.Row>
                <Grid.Row>
                    <Table fixed>
                        <Table.Header>
                            <Table.Row>
                            <Table.Cell style={{ color: "#1d6fa5" }}>
                                <h3>Faucet Details</h3>
                            </Table.Cell>

                            <Table.Cell style={{ color: "#1d6fa5" }}>
                                <h3>acc://d4c8d9ab07daeecf50a7c78ff03c6524d941299e5601e578/ACME</h3>
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
                                    Faucet
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label color="blue">Transaction ID</Label>
                                </Table.Cell>
                                <Table.Cell>
                                bcb487dc47893266a9dca0c690f71f896accf40b673fbee38d72502477a8eb9f
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>
                                    <Label color="blue">Hash</Label>
                                </Table.Cell>
                                <Table.Cell>
                                    FB76D727CE41E559B2E3548995B55E22A463D7A634474832DF2D42926EB8A840
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Grid.Row>
            </Grid>
          );
    }
}

export default FaucetDetails;