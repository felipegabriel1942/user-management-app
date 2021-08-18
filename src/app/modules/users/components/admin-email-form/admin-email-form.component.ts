import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'src/app/core/services/form.service';

@Component({
  selector: 'app-admin-email-form',
  templateUrl: './admin-email-form.component.html',
  styleUrls: ['./admin-email-form.component.css']
})
export class AdminEmailFormComponent implements OnInit {
  @Input() form: FormGroup;

  constructor(private formService: FormService) {}

  ngOnInit(): void {}

  showErrorMessage(field: string): boolean {
    return this.formService.controlIsTochedAndInvalid(this.form.get(field));
  }
}
