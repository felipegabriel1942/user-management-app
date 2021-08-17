import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/core/http/user.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { User } from 'src/app/shared/models/user.model';

export enum Modal {
  CREATE_USER = 'createUser',
  DELETE_USER = 'deleteUser',
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  page: any;
  form: FormGroup;
  modal = Modal;

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
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      admin: new FormControl(false),
    });
  }

  onSaveBtnClick(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isCreatingUser()) {
      this.save();
    } else {
      this.update();
    }
  }

  isCreatingUser(): boolean {
    return this.form.get('id').value == null;
  }

  save(): void {
    this.userService.save(this.form.value).subscribe((_) => {
      this.getUsers();
      this.closeModal(Modal.CREATE_USER);
      this.notificationService.success('User created successfully.');
    });
  }

  update(): void {
    this.userService.update(this.form.value).subscribe((_) => {
      this.getUsers();
      this.closeModal(Modal.CREATE_USER);
      this.notificationService.success('User updated successfully.');
    });
  }

  delete(): void {
    this.userService.delete(this.form.get('id').value).subscribe((_) => {
      this.form.reset();
      this.getUsers();
      this.closeModal(Modal.DELETE_USER);
      this.notificationService.success('User deleted successfully.');
    });
  }

  getUsers(): void {
    this.userService.getUsers(0).subscribe((res) => {
      console.log(res);
      this.page = res;
    });
  }

  onEditUserBtnClicked(user: User): void {
    this.form.patchValue(user);
    this.openModal(Modal.CREATE_USER);
  }

  onCreateUserBtnClicked(): void {
    this.form.reset();
    this.openModal(Modal.CREATE_USER);
  }

  onDeleteUserBtnClicked(user: User): void {
    this.form.patchValue(user);
    this.openModal(Modal.DELETE_USER);
  }

  openModal(modal: Modal): void {
    this.modalService.open(modal);
  }

  closeModal(modal: Modal): void {
    this.modalService.close(modal);
  }
}
