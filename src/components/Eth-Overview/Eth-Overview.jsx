import React, { Component } from "react";
import axios from "axios";
import "./eth-overview.css";
import { Card, Grid, Icon, Dropdown, Button, Input } from "semantic-ui-react";
import LatestBlocks from "../Latest-Blocks/index";
import LatestTxs from "../Latest-Txs/index";
import BlockDetails from "../AccumulateBlock/index";
import FaucetDetails from "../AccumulateBlock/FaucetDetails";
import TransactionDetails from "../Transactions";

// import api key from the env variable
// const apiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;
const apiKey = "AHCNY3FK6HYWA2E14A7ARMMG2GN2F4PW6Q";

const endpoint = `https://api.etherscan.io/api`;

class EthOverview extends Component {
  constructor() {
    super();
    this.state = {
      ethUSD: "",
      ethBTC: "",
      blockNo: "",
      latestBlock: 0,
      difficulty: "",
      marketCap: 0,
      ethFlag : true,
      blockDetail : false,
      faucetFlag: false,
      transactionDetailsFlag: false,
      blockDetailUrl : "",
      transactionUrl : "",
      filteValue: "",
      searchValue: ""
    };
  }

  async componentDidMount() {
    this.setState({
      filterValue: "All Filters",
      searchValue: ""
    })
    // get the ethereum price
    axios
      .get(endpoint + `?module=stats&action=ethprice&apikey=${apiKey}`)
      .then(res => {
        const { result } = res.data;
        this.setState(
          {
            ethUSD: result.ethusd,
            ethBTC: result.ethbtc
          },
          () => {
            // get the market cap of ether in USD
            axios
              .get(endpoint + `?module=stats&action=ethsupply&apikey=${apiKey}`)
              .then(res => {
                const { result } = res.data;
                // in wei
                const priceWei = result.toString();

                // in ether
                const priceEth = priceWei.slice(0, priceWei.length - 18);
                console.log(result, priceWei, priceEth);
                // convert eth in USD
                this.setState({
                  marketCap: parseInt(priceEth) * this.state.ethUSD
                });
              });
          }
        );
      });

    // get the latest block number
    axios
      .get(endpoint + `?module=proxy&action=eth_blockNumber&apikey=${apiKey}`)
      .then(res => {
        this.setState({
          latestBlock: parseInt(res.data.result),
          blockNo: res.data.result // save block no in hex
        });

        // get the block difficulty
        let difficultyUrl = endpoint +
        `?module=proxy&action=eth_getBlockByNumber&tag=${res.data.result}&boolean=true&apikey=${apiKey}`
        axios
          .get(
            endpoint +
              `?module=proxy&action=eth_getBlockByNumber&tag=${res.data.result}&boolean=true&apikey=${apiKey}`
          )
          .then(blockDetail => {
            const { result } = blockDetail.data;

            const difficulty = parseInt(result.difficulty).toString();

            // convert difficulty in Terra Hash
            // instead of dividing it with 10^12 we'll slice it
            const difficultyTH = `${difficulty.slice(0, 4)}.${difficulty.slice(
              4,
              6
            )} TH`;

            this.setState({
              difficulty: difficultyTH
            });
          });
      });
  }

  updateUrl = (blockDetailUrl) => {
    console.log("Here")
    this.setState({
      blockDetailUrl: blockDetailUrl
    })
  }

  updateTransactionUrl = (transactionUrl) => {
    this.setState({
      transactionUrl: transactionUrl
    })
  }
  getComponent = (ethFlag, blockDetail, faucetFlag, transactionDetailsFlag) => {
    this.setState({
      ethFlag : ethFlag,
      blockDetail : blockDetail,
      faucetFlag: faucetFlag,
      transactionDetailsFlag: transactionDetailsFlag
    })
  }
  getLatestBlocks = () => {
    if (this.state.latestBlock) {
      return <LatestBlocks latestBlock={this.state.latestBlock} getComponent = {this.getComponent} updateUrl = {this.updateUrl}></LatestBlocks>;
    }
  };

  getLatestTxs = () => {
    if (this.state.blockNo) {
      return <LatestTxs blockNo={this.state.blockNo} getComponent = {this.getComponent} updateTransactionUrl = {this.updateTransactionUrl}></LatestTxs>;
    }
  };

  getDropDownValue = (event, {value}) => {
    this.setState({
      filterValue: value
    })
  }

  getInputValue = (event, {value}) => {
    console.log("Search value is ", value)
    this.setState({
      searchValue: value
    })
  }

  getComponentOnSearch = () => {
    if(this.state.filterValue == "Accumulate"){
      this.setState({
        blockDetailUrl: this.state.searchValue
      })
      this.getComponent(false, true, false, false)
    }else if(this.state.filterValue == "Transactions"){
      this.setState({
        transactionUrl: this.state.searchValue
      })
      this.getComponent(false, false, false, true)
    }
  }
  render() {
    const options = [
      { key: 'Accumulate Object', text: 'Accumulate Object', value: 'Accumulate' },
      { key: 'Accumulate Transactions', text: 'Accumulate Transactions', value: 'Transactions' }
      // ,{ key: 'Sig Id', text: 'Sig Id', value: 'SigId' },
      // { key: 'Sig Group', text: 'Sig Group', value: 'SigGroup' }
    ]
    const { ethUSD, ethBTC, latestBlock, difficulty, marketCap } = this.state;
    return (
      
      ((this.state.transactionDetailsFlag && <TransactionDetails getComponent = {this.getComponent} transactionUrl = {this.state.transactionUrl}/>)||(this.state.faucetFlag && <FaucetDetails getComponent = {this.getComponent}/>)||(this.state.blockDetail && <BlockDetails getComponent = {this.getComponent} blockDetailUrl = {this.state.blockDetailUrl}/>) || this.state.ethFlag && 
        <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Card>
                <Card.Content>
                  <Card.Header style={{ color: "#1d6fa5" }}>
                    <Icon name="ethereum"></Icon> ACCUMULATE PRICE
                  </Card.Header>
                  <Card.Description textAlign="left">
                    <Icon name="usd"></Icon>
                    NA
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={4}>
              <Card>
                <Card.Content>
                  <Card.Header style={{ color: "#1d6fa5" }}>
                    <Icon name="list alternate outline"></Icon> LATEST BLOCK
                  </Card.Header>
                  <Card.Description textAlign="left">
                    <Icon name="square"></Icon> NA
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={4}>
              <Card>
                <Card.Content>
                  <Card.Header style={{ color: "#1d6fa5" }}>
                    <Icon name="setting"></Icon> DIFFICULTY
                  </Card.Header>
                  <Card.Description textAlign="left">
                    NA
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column width={4}>
              <Card>
                <Card.Content>
                  <Card.Header style={{ color: "#1d6fa5" }}>
                    <Icon name="world"></Icon> MARKET CAP
                  </Card.Header>
                  <Card.Description textAlign="left">
                    <Icon name="usd"></Icon> NA
                  </Card.Description>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid columns={3} padded>
          <Grid.Column width={4}>
            <Button.Group color='blue'>
              <Button>{this.state.filterValue}</Button>
              <Dropdown
                className='button icon'
                floating
                options={options}
                trigger={<></>}
                onChange={this.getDropDownValue}
              />
            </Button.Group>
          </Grid.Column>
          <Grid.Column  width={2}>
            <Input style={{ width:"300px" }} focus placeholder='Search...' onChange={this.getInputValue} />
          </Grid.Column>
          <Grid.Column width={6}>
            <Button  color="blue" onClick={this.getComponentOnSearch}>Search</Button>
          </Grid.Column>
        </Grid>

        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column>{this.getLatestBlocks()}</Grid.Column>
            <Grid.Column>{this.getLatestTxs()}</Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid >
          <Grid.Row color='blue'>
          *NA -  Data is not available yet as product is in development phase. Required data is going to be available soon.
          </Grid.Row>
        </Grid>
      </div>
      )
    );
  }
}

export default EthOverview;