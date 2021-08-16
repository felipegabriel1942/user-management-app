import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/http/user.service';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {


  constructor(
    private userService: UserService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {}

  save(): void {
    this.userService
      .save(
        new User({
          name: 'Felipe Gabriel Pinheiro',
          login: 'felipe',
          password: '123',
          email: 'teste@yahoo.com.br',
        })
      )
      .subscribe();
  }

  openModal(): void {
    this.modalService.open('modal');
  }
}
