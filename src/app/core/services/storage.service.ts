import { Injectable } from '@angular/core';

import { StorageKeys } from '../enums/storage-keys.enum';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storageObjectKey = 'applicationData';

  constructor() {}

  public setItem(key: StorageKeys, value: any): void {
    const storageObject = this.getStorageObject();
    storageObject[key.valueOf().toString()] = value;
    sessionStorage.setItem(
      this.storageObjectKey,
      JSON.stringify(storageObject)
    );
  }

  public getItem(key: StorageKeys): any {
    const storageObject = this.getStorageObject();

    return storageObject === {}
      ? null
      : storageObject[key.valueOf().toString()];
  }

  public deleteStorageObject(): any {
    sessionStorage.removeItem(this.storageObjectKey);
  }

  public getStorageObject(): any {
    const storageObject = sessionStorage.getItem(this.storageObjectKey);

    return storageObject == null ? {} : JSON.parse(storageObject);
  }
}
