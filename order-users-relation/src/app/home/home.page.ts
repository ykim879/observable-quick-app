import { Component } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { DataService, Order, User } from '../data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage {
  //create two observables, and one sitemap, user observable subscrbie to orderid and orderid subscribe to userid
  users : User[] = [];
  orders: Order[] = [];
  newUserName = "";
  userNameList: string[] = [];
  newOrderUserName = "";
  //two buttons, one create users, and other creates orders. when user's firstName changes it will change on userid by subscribing to user's firstName
  constructor(private dataService : DataService) {
    
  }

  ngOnInit() {
    this.dataService.users.subscribe((users) => {
      this.users = users;
    });
    this.dataService.users.pipe(
      map((users: User[]) => users.map(user => of(user.name))),
      switchMap((names: Observable<string>[]) => forkJoin(names))
    ).subscribe((names: string[]) => {
      this.userNameList = names;
    });
    this.dataService.orders.subscribe((orders) => this.orders = orders);
  }

  onUserEdit() {
    this.dataService.refreshUser();
  }
  onUserCreate() {
    this.dataService.addUser(new User(this.newUserName));
  }
  onNameClicked(name: string) {
    of(name).subscribe( (name) =>
      this.newOrderUserName = name
    );
  }
  onOrderCreate() {
    this.dataService.addOrder(new Order(this.newOrderUserName));
  }
}
