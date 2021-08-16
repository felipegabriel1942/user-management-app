import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  faEdit,
  faTrash,
  faMailBulk,
  faKey,
} from '@fortawesome/free-solid-svg-icons';

import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faMailBulk = faMailBulk;
  faKey = faKey;

  @Input() page: any;

  @Output() onEditClick = new EventEmitter();
  @Output() onDeleteClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
