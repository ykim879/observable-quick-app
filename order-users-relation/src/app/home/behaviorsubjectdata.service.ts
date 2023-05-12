import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviorSubjectDataService {

  private usersSubject = new BehaviorSubject<User[]>([new User("firstname"), new User("secondName")]);
  users$ = this.usersSubject.asObservable();

  private ordersSubject = new BehaviorSubject<Order[]>([]);
  orders$ = this.ordersSubject.asObservable(); 
  constructor() { 
    this.users$.subscribe((users) => {
      let orders = new Array<Order>();
      console.log("subscribing called: ", users);
      for (const user of users) {
        orders.push(new Order(user))
      }
      console.log("next orders: ", orders);
      this.ordersSubject.next(orders);
    })
   
  }

  get users() {
    return this.users$;
  }

  get orders() {
    return this.orders$;
  }
  addUser(user: User) {
    const users = this.usersSubject.getValue();
    this.usersSubject.next([...users, user]);
    this.users$.forEach(user => console.log(user));
  }

  deleteUser(deletedUser: User) {
    const users = this.usersSubject.getValue();
    const updatedUsers = users.filter((user) => {
      return user.userId != deletedUser.userId;
    });
    this.usersSubject.next(updatedUsers);
  }

}

export class User {
  private static nextUserId = 0;
  userId: number;
  //make it observable
  private userNameSubject = new BehaviorSubject<String>("");
  userName$ = this.userNameSubject.asObservable();
  editName = "";
  constructor(name : string) {
    this.userId = User.nextUserId++;
    this.userNameSubject.next(name);
    this.editName = name;
  }

  get userName() {
    return this.userNameSubject.getValue();
  }

  editUserName() {
    this.userNameSubject.next(this.editName);
  }

}

export class Order {
  private static nextOrderId = 0;
  orderId: number;
  userName = new String("");
  constructor(user: User) {
    this.orderId = Order.nextOrderId;
    user.userName$.subscribe((name) => this.userName = name);
  }
}