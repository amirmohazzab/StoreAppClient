import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user-service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { IAdminUser } from '../../models/IAdminUser';
import { HasPermissionDirective } from '../../directive/has-permission-directive';
import { UserPermission } from '../../modal/user-permission/user-permission';

@Component({
  selector: 'app-admin-list-user',
  imports: [FormsModule, RouterModule, HasPermissionDirective, DatePipe, UserPermission],
  templateUrl: './admin-list-user.html',
  styleUrl: './admin-list-user.scss'
})
export class AdminListUser implements OnInit{

   users: IAdminUser[] = [];
  
     pageNumber: number = 1;
     pageSize: 5;
     search: "";
     sort: string = "username";
     totalCount = 0;
     permissions: any[] = [];

  @ViewChild('permissionsModal') permissionsModal!: UserPermission;

  pagination: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadAllPermissions();
  }

   loadUsers() {
     this.userService.getUsers(this.pageNumber, this.pageSize, this.search, this.sort)
       .subscribe(res => {
         this.users = res.result;
         this.totalCount = res.count;
         console.log(this.users);
       });
   }

  // loadAllPermissions() {
  //   this.userService.getAllPermissions().subscribe(res => this.allPermissions = res);
  // }

  loadAllPermissions() {
  this.userService.getAllPermissions()
    .subscribe(perms => {
      perms.forEach(p => this.permissions[p.id] = p.displayName);
    });
}

  openPermissionsModal(user: any) {
    this.permissionsModal.open(user);
  }

  onPermissionsSaved() {
    this.loadUsers(); 
  }

  onSearch() {
    this.pageNumber = 1;
    this.loadUsers();
  }

    onSort(field: string) {
     this.sort = field;
     this.loadUsers();
   }

   pageChanged(event: number) {
     this.pageNumber = event;
     this.loadUsers();
   }

  deleteUser(id: string) {
    if (!confirm("Are you Sure!")) return;

    this.userService.deleteUser(id).subscribe(() => {
      this.toast.success("User deleted");
      this.loadUsers();
    });
  }

  goToDetails(id: string) {
    this.router.navigate(['/admin/user/details', id]);
  }

  goToEdit(id: string) {
    this.router.navigate(['/admin/user/edit', id]);
  }
}
