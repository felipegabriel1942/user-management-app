import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  open(id: string): void {
    const modal = {
      keyboard: false,
      show: true,
    };

    $(`#${id}`).modal(modal);
  }

  close(id: string): void {
    $(`#${id}`).modal('hide');
  }
}
