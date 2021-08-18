import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './pages/users/users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserTableComponent } from './components/user-table/user-table.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserUpdateFormComponent } from './components/user-update-form/user-update-form.component';
import { UserEmailFormComponent } from './components/user-email-form/user-email-form.component';
import { AdminEmailFormComponent } from './components/admin-email-form/admin-email-form.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserTableComponent,
    UserFormComponent,
    UserUpdateFormComponent,
    UserEmailFormComponent,
    AdminEmailFormComponent,
  ],
  imports: [CommonModule, UsersRoutingModule, SharedModule],
})
export class UsersModule {}
