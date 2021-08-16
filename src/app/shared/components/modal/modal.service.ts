import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  open(id: string, closeOnBackgroundClick = true): void {
    let modal = {
      keyboard: false,
      show: true,
    };

    if (!closeOnBackgroundClick) {
      modal = Object.assign({ backdrop: 'static' }, modal);
    }

    $(`#${id}`).modal(modal);
  }

  close(id: string): void {
    $(`#${id}`).modal('hide');
  }
}
