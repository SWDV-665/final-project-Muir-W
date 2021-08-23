import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ChoreServiceProvider } from '../../providers/chore-service/chore-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  title = "Chore List";

  items = [];
  funds = 0;
  errorMessage: string;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: ChoreServiceProvider, public inputDialogService: InputDialogServiceProvider) {
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadItems();
    });
  }


  ionViewDidLoad() { //*****Added */
    this.loadItems();
  }

  loadItems() {
    this.dataService.getItems()
      .subscribe(
        items => this.items = items,
        error => this.errorMessage = <any>error);
        
  }

  removeItem(id, value){
    this.funds = this.funds + value; //accumulate completed items
    this.dataService.removeItem(id, value);
  }

  editItem(item, index){
    console.log("Editing item - ", item, index);
    const toast = this.toastCtrl.create({
      message: 'Editing Item - '+ index + " ...",
      duration: 3000
  });

  toast.present();
  this.inputDialogService.showPrompt(item, index);
  }

  addItem(){
    console.log("Adding Item");
    this.inputDialogService.showPrompt();

  }

}
