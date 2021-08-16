import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/core/http/user.service';
import { ModalService } from 'src/app/shared/components/modal/modal.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  form: FormGroup;

  constructor(
    private userService: UserService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      login: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const user = this.form.value;

    this.userService.save(user).subscribe((res) => {
      console.log(res);
      this.closeModal();
    });
  }

  openModal(): void {
    this.form.reset();
    this.modalService.open('modal');
  }

  closeModal(): void {
    this.modalService.close('modal');
  }

  showErrorMessage(field: string): boolean {
    return this.form.get(field).invalid && this.form.get(field).touched;
  }
}
