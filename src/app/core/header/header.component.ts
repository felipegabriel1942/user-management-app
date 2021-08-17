import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;

  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {
    this.showHeader();
  }

  logout(): void {
    this.storageService.deleteStorageObject();
    this.router.navigateByUrl('');
  }

  showHeader(): boolean {
    return Object.keys(this.storageService.getStorageObject()).length !== 0;
  }
}
