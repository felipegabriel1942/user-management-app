import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() {}

  controlIsTochedAndInvalid(control: AbstractControl): boolean {
    return control.invalid && control.touched;
  }
}
