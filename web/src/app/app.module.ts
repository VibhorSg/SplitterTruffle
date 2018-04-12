import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { MatButtonModule, MatCardModule, MatToolbarModule, MatInputModule, MatListModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { Web3Service } from './web3.service'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, MatButtonModule, MatCardModule, MatToolbarModule, MatInputModule, MatListModule, MatSelectModule, BrowserAnimationsModule, FormsModule
  ],
  providers: [Web3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
