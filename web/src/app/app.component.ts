import { Component } from '@angular/core';
import { Web3Service } from './web3.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  private senderAccount: string
  private senderBalance: string
  private amountToSend: string
  private receiver1Account: string
  private receiver1Balance: string
  private receiver2Account: string
  private receiver2Balance: string
  private logMessage: string
  
  constructor(private web3Service: Web3Service) {}

  ngOnInit() {
    this.web3Service.initialise()
  }

  getInitialBalances(){

  }

  split() {
    this.web3Service.splitterInstance.splitFunds(this.receiver1Account, this.receiver2Account,{from: this.senderAccount, gas: "1721975", gasPrice: "20000000000", value: this.web3Service.web3.toWei(this.amountToSend, "ether")})
    this.logMessage = "Press refresh button to get updated accounts balance"
  }

  senderChanged() {
    this.senderBalance = this.web3Service.web3.fromWei(this.web3Service.web3.eth.getBalance(this.senderAccount), "ether").toString()
    console.log(this.senderBalance)
  }

  receiver1Changed(){
    this.receiver1Balance = this.web3Service.web3.fromWei(this.web3Service.web3.eth.getBalance(this.receiver1Account), "ether").toString()
    console.log(this.receiver1Balance)
  }

  receiver2Changed(){
    this.receiver2Balance = this.web3Service.web3.fromWei(this.web3Service.web3.eth.getBalance(this.receiver2Account), "ether").toString()
  }

  refreshBalances(){
    this.senderChanged()
    this.receiver1Changed()
    this.receiver2Changed()
  }
}
