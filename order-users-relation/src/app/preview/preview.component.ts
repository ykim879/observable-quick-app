import { Component, OnInit } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { DataService, User } from '../data-service.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['../app.component.scss'],
})
export class PreviewComponent  implements OnInit {

  users : User[] = [];
  userNameList: string[] = [];

  constructor(private dataService : DataService) { }

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
  }

}
