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
const requestBody = [{
  "jsonrpc": "2.0",
  "id": 0,
  "method": "get",
  "params": {
      "url": "acc://d4c8d9ab07daeecf50a7c78ff03c6524d941299e5601e578/ACME"
  }
},{
  "jsonrpc": "2.0",
  "id": 0,
  "method": "get",
  "params": {
      "url": "acc://7117c50f04f1254d56b704dc05298912deeb25dbc1d26ef6/ACME"
  }
}]

class LatestBlocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: []
    };
  }

  componentDidMount = () => {
    this.getBlocks();
  };

  getComponent = (e) => {
    this.props.updateUrl(e.target.text)
    this.props.getComponent(false, true, false, false)
  }

  getBlocks = async () => {
    const { latestBlock } = this.props;

    let blocks = [];

    for (let i = 0; i < 2; i = i + 1) {
      // get the block transaction
      // const blockDetail = await axios.get(
      //   endpoint +
      //     `?module=proxy&action=eth_getBlockByNumber&tag=${(
      //       latestBlock - i
      //     ).toString(16)}&boolean=true&apikey=${apiKey}`
      // );

      const blockDetail = await axios.post(
        endpoint, requestBody[i]
      );
      let stackUrl = "https://stackoverflow.com/questions/49899107/making-text-urls-clickable-in-a-div";
      const { result } = blockDetail.data;
      blocks.push(
        <Table.Row key={i}>
          <Table.Cell>
            <Label color="blue">Ac</Label>  <a href="#" onClick={this.getComponent}>{result.data.url}</a>
          </Table.Cell>
          <Table.Cell>
            AccType {result.type} <br></br>
            Txs {result.data.txCount}
          </Table.Cell>
          <Table.Cell>
            <Label color="blue">Balance </Label> {result.data.balance}
          </Table.Cell>
        </Table.Row>
      );

      this.setState({
        blocks: blocks
      });
    }
  };

  render() {
    return (
      <Table fixed>
        <Table.Header>
          <Table.Row>
            <Table.Cell style={{ color: "#1d6fa5" }}>
              <h4>Latest Accumulate Object</h4>
            </Table.Cell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{this.state.blocks}</Table.Body>
      </Table>
    );
  }
}

export default LatestBlocks;