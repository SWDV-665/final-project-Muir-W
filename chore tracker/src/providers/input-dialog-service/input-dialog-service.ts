import { Injectable } from '@angular/core';
import { ChoreServiceProvider } from '../../providers/chore-service/chore-service';
import { AlertController } from 'ionic-angular';


/*
  Generated class for the InputDialogServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class InputDialogServiceProvider {

  constructor(public dataService: ChoreServiceProvider, public alertCtrl: AlertController) {
    console.log('Hello InputDialogServiceProvider Provider');
  }

  showPrompt(item?, index?) {
    const prompt = this.alertCtrl.create({
      title: item ? 'Edit Chore' : 'Add Chore',
      message: item ? "Please Edit Chore" : "Please Enter Chore",
      inputs: [
        {
          name: 'choredesc',
          placeholder: 'Chore Description',
          value: item ? item.choredesc : null
        },
        {
          name: 'value',
          placeholder: '$0.00',
          value: item ? item.value : null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked', data);
            if (index !== undefined) {
              item.choredesc = data.choredesc;
              item.value = data.value;
              this.dataService.editItem(item, index);
            }
            else {
              this.dataService.addItem(data);
            }

          }
        }
      ]
    });
    prompt.present();
  }


}
