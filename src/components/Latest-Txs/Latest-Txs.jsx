import React, { Component } from "react";
import {
  Table,
  Label
} from "semantic-ui-react";
import axios from "axios";

// const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
// const apiKey = "AHCNY3FK6HYWA2E14A7ARMMG2GN2F4PW6Q";
// const endpoint = `https://api.etherscan.io/api`;

const endpoint = `https://testnet.accumulatenetwork.io/v1`;
const requestBody = {
  "jsonrpc": "2.0",
  "id": 0,
  "method": "token-account-history",
  "params": {
      "url": "acc://d4c8d9ab07daeecf50a7c78ff03c6524d941299e5601e578/ACME"
  }
}

class LatestTxs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: []
    };
  }

  getComponent = (e) => {
    this.props.updateTransactionUrl(e.target.text)
    this.props.getComponent(false, false, false, true)
  }

  componentDidMount = () => {
    this.getTxs();
  };

  getTxs = async () => {
    const { blockNo } = this.props;

    // get the block transaction
    // const blockDetail = await axios.get(
    //   endpoint +
    //     `?module=proxy&action=eth_getBlockByNumber&tag=${blockNo}&boolean=true&apikey=${apiKey}`
    // );

    const blockDetail = await axios.post(
      endpoint, requestBody
    );

    const transactions  = blockDetail.data.result.data;

    let txsDetails = [];

    for (let i = 0; i < Math.min(transactions.length, 5); i = i + 1) {
      const tx = transactions[i];
      txsDetails.push(
        <Table.Row key={i}>
          <Table.Cell>
            <Label color="blue">Tx</Label> <a href="#" onClick={this.getComponent}>{tx.data.txid}</a>
          </Table.Cell>
          <Table.Cell>
            From {tx.data.from} <br></br>
            To {tx.data.to}
          </Table.Cell>
          <Table.Cell>
            {" "}
            <Label color="blue">Balance</Label> {tx.data.amount}
          </Table.Cell>
        </Table.Row>
      );
    }

    this.setState({
      transactions: txsDetails
    });
  };

  render() {
    return (
      <div>
        <Table fixed>
          <Table.Header>
            <Table.Row>
              <Table.Cell style={{ color: "#1d6fa5" }}>
                <h4> Latest Transactions</h4>
              </Table.Cell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.state.transactions}</Table.Body>
        </Table>
      </div>
    );
  }
}

export default LatestTxs;