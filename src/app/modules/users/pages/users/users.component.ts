import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/http/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {

  }

  save(): void {
    this.userService
    .save(
      new User({
        name: 'Felipe Gabriel Pinheiro',
      })
    )
    .subscribe();
  }
}
