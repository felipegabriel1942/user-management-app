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
      this.closeModal();
      this.notificationService.success('User created successfully.');
    });
  }

  update(): void {
    this.userService.update(this.form.value).subscribe((_) => {
      this.getUsers();
      this.closeModal();
      this.notificationService.success('User updated successfully.');
    });
  }

  getUsers(): void {
    this.userService.getUsers(0).subscribe((res) => {
      this.page = res;
    });
  }

  edit(user: User): void {
    this.openModal();
    this.form.patchValue(user);
  }

  openModal(): void {
    this.form.reset();
    this.modalService.open('modal');
  }

  closeModal(): void {
    this.modalService.close('modal');
  }
}
