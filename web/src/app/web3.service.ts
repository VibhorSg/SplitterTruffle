import { Injectable } from '@angular/core'
import * as Web3 from 'web3'
import * as TruffleContract from 'truffle-contract'
import * as  splitterArtifacts from '../../../build/contracts/Splitter.json'

declare let window: any;

@Injectable()
export class Web3Service {

    public web3: Web3
    public splitterInstance: any
    public accounts: any
    private splitter: any

    constructor() { }

    initialise() {
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof window.web3 !== 'undefined') {
            // Use Mist/MetaMask's provider
            this.web3 = new Web3(this.web3.currentProvider)
        } else {
            console.log('No web3? You should consider trying MetaMask!')
            // Hack to provide backwards compatibility for Truffle, which uses web3js 0.20.x
            Web3.providers.HttpProvider.prototype.sendAsync = Web3.providers.HttpProvider.prototype.send;
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
            this.artifactsToContract()
        }
    }

    private async artifactsToContract() {
        this.accounts = await this.web3.eth.accounts
        console.log(this.accounts)

        // ABI description as JSON structure
        this.splitter = await TruffleContract(splitterArtifacts)
        this.splitter.setProvider(this.web3.currentProvider);

        console.log("Deploying the contract");
        this.splitter.deployed({from: this.accounts[0]}).then(async (instance) => {
            console.log('Before assigning')
            this.splitterInstance = instance
            console.log(instance)
            // Transaction has entered to geth memory pool
            console.log("Your contract is being deployed in transaction at " + this.splitterInstance.transactionHash)

            this.addWatchEvent()
        })
    }

    async addWatchEvent() {
        console.log("Settig watcher for log")
        var ev = await this.splitterInstance.LogSplitFunds({}, { fromBlock: 0, toBlock: 'latest' }).watch(function (error, event) { console.log(event); })
        console.log(ev)
    }

}