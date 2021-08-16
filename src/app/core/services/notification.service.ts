import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private toastrService: ToastrService) {}

  success(message: string): void {
    this.toastrService.success(message);
  }

  error(message: string): void {
    this.toastrService.error(message);
  }
}
