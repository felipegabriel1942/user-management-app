import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailService } from 'src/app/core/http/email.service';

import { UserService } from 'src/app/core/http/user.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { Email } from 'src/app/shared/models/email.model';
import { User } from 'src/app/shared/models/user.model';

export enum Modal {
  CREATE_USER = 'createUser',
  DELETE_USER = 'deleteUser',
  UPDATE_PASSWORD = 'updatePassword',
  EMAIL_USER = 'emailUser',
  EMAIL_ALL_ADMINS = 'emailAllAdmins'
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  page: any;
  modal = Modal;
  userForm: FormGroup;
  emailForm: FormGroup;

  constructor(
    private userService: UserService,
    private emailService: EmailService,
    private modalService: ModalService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.buildForms();
    this.getUsers();
  }

  buildForms(): void {
    this.userForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      admin: new FormControl(false),
    });

    this.emailForm = new FormGroup({
      destination: new FormControl({ value: null, disabled: true }),
      subject: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
    });
  }

  onSaveBtnClick(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    if (this.isCreatingUser()) {
      this.save();
    } else {
      this.update();
    }
  }

  isCreatingUser(): boolean {
    return this.userForm.get('id').value == null;
  }

  save(): void {
    this.userService.save(this.userForm.value).subscribe((_) => {
      this.getUsers();
      this.closeModal(Modal.CREATE_USER);
      this.notificationService.success('User created successfully.');
    });
  }

  update(): void {
    this.userService.update(this.userForm.value).subscribe((_) => {
      this.getUsers();
      this.closeModal(Modal.CREATE_USER);
      this.notificationService.success('User updated successfully.');
    });
  }

  delete(): void {
    this.userService.delete(this.userForm.get('id').value).subscribe((_) => {
      this.userForm.reset();
      this.getUsers();
      this.closeModal(Modal.DELETE_USER);
      this.notificationService.success('User deleted successfully.');
    });
  }

  updatePassword(): void {
    this.userService.updatePassword(this.userForm.value).subscribe((_) => {
      this.getUsers();
      this.closeModal(Modal.UPDATE_PASSWORD);
      this.notificationService.success('Password updated successfully.');
    });
  }

  getUsers(page: number = 0): void {
    this.userService.getUsers(page).subscribe((res) => {
      this.page = res;
    });
  }

  sendEmailToUser(): void {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }

    this.emailService.sendToUser(this.emailForm.getRawValue()).subscribe((_) => {
      this.closeModal(Modal.EMAIL_USER);
      this.notificationService.success('Email sent successfully.');
    });
  }

  sendEmailToAllAdmins(): void {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }

    this.emailService.sendToAllAdmins(this.emailForm.getRawValue()).subscribe((_) => {
      this.closeModal(Modal.EMAIL_ALL_ADMINS);
      this.notificationService.success('Email sent successfully.');
    });
  }

  onEditUserBtnClicked(user: User): void {
    this.userForm.patchValue(user);
    this.openModal(Modal.CREATE_USER);
  }

  onCreateUserBtnClicked(): void {
    this.userForm.reset();
    this.openModal(Modal.CREATE_USER);
  }

  onDeleteUserBtnClicked(user: User): void {
    this.userForm.patchValue(user);
    this.openModal(Modal.DELETE_USER);
  }

  onUpdatePasswordClicked(user: User): void {
    this.userForm.patchValue(user);
    this.userForm.get('password').setValue(null);
    this.openModal(Modal.UPDATE_PASSWORD);
  }

  onSendEmailToUserBtnClicked(user: User): void {
    this.emailForm.reset();
    this.emailForm.get('destination').setValue(user.email);
    this.openModal(Modal.EMAIL_USER);
  }

  onSendEmailToAllAdminsBtnClicked(): void {
    this.emailForm.reset();
    this.openModal(Modal.EMAIL_ALL_ADMINS);
  }

  openModal(modal: Modal): void {
    this.modalService.open(modal);
  }

  closeModal(modal: Modal): void {
    this.modalService.close(modal);
  }
}
