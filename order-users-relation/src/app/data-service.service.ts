import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private usersSubject = new BehaviorSubject<User[]>([new User("firstname"), new User("secondName")]);
  users$ = this.usersSubject.asObservable();

  private ordersSubject = new BehaviorSubject<Order[]>([]);
  orders$ = this.ordersSubject.asObservable(); 
  constructor() { 
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

  addOrder(order: Order) {
    const orders = this.ordersSubject.getValue();
    this.ordersSubject.next([...orders, order]);
  }

  refreshUser() {
    this.usersSubject.next(this.usersSubject.getValue());
  }
}

export class User {
  private static nextUserId = 0;
  userId: number;
  //make it observable
  name: string;
  constructor(name : string) {
    this.userId = User.nextUserId++;
    this.name = name;
  }
}

export class Order {
  private static nextOrderId = 0;
  orderId: number;
  userName: string;
  constructor(name : string) {
    this.orderId = Order.nextOrderId;
    this.userName = name;
  }
}
