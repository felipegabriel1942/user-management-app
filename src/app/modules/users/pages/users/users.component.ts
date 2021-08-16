import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/core/http/user.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  @Input() page: any;

  form: FormGroup;

  constructor(
    private userService: UserService,
    private modalService: ModalService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getUsers();
  }

  buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      admin: new FormControl(false),
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user = this.form.value;

    this.userService.save(user).subscribe((_) => {
      this.getUsers();
      this.closeModal();
      this.notificationService.success('User created successfully.');
    });
  }

  getUsers(): void {
    this.userService.getUsers(0).subscribe((res) => {
      this.page = res;
      console.log(res);
    });
  }

  openModal(): void {
    this.form.reset();
    this.modalService.open('modal');
  }

  closeModal(): void {
    this.modalService.close('modal');
  }

}
