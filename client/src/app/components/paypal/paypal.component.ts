import { Component, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

//declare var paypal:any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrl: './paypal.component.css'
})
export class PaypalComponent {

  valorInput: string=""

  mostrar(){console.log(this.valorInput)}
  public payPalConfig ? : IPayPalConfig;
  
  ngOnInit(): void {
      this.initConfig();
  }
  
  private initConfig(): void {
      this.payPalConfig = {
          currency: 'MXN',
          clientId: 'AcrHKpSZVRQciIurN8zUGa6vcblvc-arfKv_nyZ0x2dnkeXttoZvkqQg472btCLHYTZ41LD3rNaz3oVj',
          createOrderOnClient: (data) => < ICreateOrderRequest > {
              intent: 'CAPTURE',
              purchase_units: [{
                  amount: {
                      currency_code: 'MXN',
                      value: this.valorInput,
                      breakdown: {
                          item_total: {
                              currency_code: 'MXN',
                              value: this.valorInput,
                          }
                      }
                  },
                  items: [{
                      name: 'Enterprise Subscription',
                      quantity: '1',
                      category: 'DIGITAL_GOODS',
                      unit_amount: {
                          currency_code: 'MXN',
                          value: this.valorInput,
                      },
                  }]
              }]
          },
          advanced: {
              commit: 'true'
          },
          style: {
              label: 'paypal',
              layout: 'vertical'
          },
          onApprove: (data, actions) => {
              console.log('onApprove - transaction was approved, but not authorized', data, actions);
        
  
          },
          onClientAuthorization: (data) => {
              console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
              
          },
          onCancel: (data, actions) => {
              console.log('OnCancel', data, actions);
              
  
          },
          onError: err => {
              console.log('OnError', err);
            
          },
          onClick: (data, actions) => {
              console.log('onClick', data, actions);
      
          }
      };
  }
}
