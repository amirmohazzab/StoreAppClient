import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../services/user-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { IAdminUser } from '../../models/IAdminUser';
import { IPermission } from '../../models/IPermission';

@Component({
  selector: 'app-user-permission',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-permission.html',
  styleUrl: './user-permission.scss'
})
export class UserPermission {

  //@Input() user: any; // IAdminUser
  user!: IAdminUser;
  @Input() allPermissions: IPermission[] = [];
  @Output() saved = new EventEmitter<void>();

  isOpen = false;

  userPermissionIds: number[] = [];

  constructor(private userService: UserService) {}

  open(user: IAdminUser) {
    this.user = user;
    forkJoin([
      this.userService.getAllPermissions(),
      this.userService.getUserPermissions(user.id)
    ])
    .subscribe({
      next: ([allPerms, userPerms]) => {

        this.allPermissions = allPerms;
        this.userPermissionIds = userPerms.map(p => p.id);
        this.isOpen = true;
      },
      error: err => {
        console.log("PERMISSION ERROR:", err);
      }
    });
  }

  close() {
    this.isOpen = false;
  }

  // loadUserPermissions() {
  //   this.userService.getUserPermissions(this.user.id).subscribe(perms => {
  //     console.log("USER PERMS:", perms);
  //     this.userPermissions = perms;
  //   });
  // }

  loadAllPermissions() {
    this.userService.getAllPermissions()
      .subscribe(res => {
        this.allPermissions = res;
      });
 }

  // togglePermission(permissionId: number, checked: boolean) {
  //   if (checked) {
  //   if (!this.userPermissionIds.includes(permissionId)) {
  //     this.userPermissionIds.push(permissionId);
  //     }
  //   } else {
  //     this.userPermissionIds = this.userPermissionIds.filter(id => id !== permissionId);
  //   }
  // }

  togglePermission(permissionId: number, event: Event) {

    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      if (!this.userPermissionIds.includes(permissionId)) {
        this.userPermissionIds.push(permissionId);
      }
    } else {
      this.userPermissionIds =
      this.userPermissionIds.filter(id => id !== permissionId);
    }
  }

  savePermissions() {
    this.userService.updateUserPermissions(this.user.id, this.userPermissionIds)
      .subscribe(() => {
        this.saved.emit();
        this.close();
      });
  }

}
