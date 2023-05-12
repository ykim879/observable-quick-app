import { Component } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { BehaviorSubjectDataService,  Order, User } from './behaviorsubjectdata.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage {
  //create two observables, and one sitemap, user observable subscrbie to orderid and orderid subscribe to userid
  users : User[] = [];
  orders: Order[] = [];
  newUserName = "";
  userNameList: String[] = [];
  user = "";
  //two buttons, one create users, and other creates orders. when user's firstName changes it will change on userid by subscribing to user's firstName
  constructor(private dataService : BehaviorSubjectDataService) {
    
  }

  ngOnInit() {
    this.dataService.users.subscribe((users) => {
      this.users = users;
    });
    this.dataService.users.pipe(
      map((users: User[]) => users.map(user => user.userName$)),
      switchMap((names: Observable<String>[]) => forkJoin(names))
    ).subscribe((names: String[]) => {
      this.userNameList = names;
    });
    this.dataService.orders.subscribe((orders) => this.orders = orders);
  }

  onUserEdit(user : User) {
    user.editUserName();
  }
  onUserDelete(user : User) {
    this.dataService.deleteUser(user);
  }
  onUserCreate() {
    this.dataService.addUser(new User(this.newUserName));
  }
  onNameClicked(name: string) {
    of(name).subscribe( (name) =>
      this.user = name
    );
  }
}
