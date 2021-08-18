import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/core/services/form.service';

@Component({
  selector: 'app-user-email-form',
  templateUrl: './user-email-form.component.html',
  styleUrls: ['./user-email-form.component.css'],
})
export class UserEmailFormComponent implements OnInit {
  @Input() form: FormGroup;

  constructor(private formService: FormService) {}

  ngOnInit(): void {}

  showErrorMessage(field: string): boolean {
    return this.formService.controlIsTochedAndInvalid(this.form.get(field));
  }
}
