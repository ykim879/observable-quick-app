import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { DataService, User } from '../data-service.service';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['../app.component.scss'],
})

export class PreviewComponent  implements OnInit {

  users : User[] = [];
  userNameList: string[] = [];


  constructor(private dataService : DataService, public navCtrl: NavController) { }

  ngOnInit() {
    this.dataService.users.subscribe((users) => {
      this.users = users;
    });
    //The name value hasn't received next(), so when it received next it will be changed
    this.dataService.users.pipe(
      map((users: User[]) => users.map(user => of(user.name))),
      switchMap((names: Observable<string>[]) => forkJoin(names))
    ).subscribe((names: string[]) => {
      this.userNameList = names;
    });
  }

  //refresh user will help observable of user.name to get changed data by refreshing the user by sending next.
  refreshUser() {
    this.dataService.refreshUser();
  }

  goAnOtherPage() {
    this.navCtrl.navigateForward('home');
  }
}
