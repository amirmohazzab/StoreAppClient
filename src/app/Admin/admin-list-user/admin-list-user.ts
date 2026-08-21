import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user-service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule} from '@angular/forms';
import { CommonModule, DatePipe, JsonPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { IAdminUser } from '../../models/IAdminUser';
import { HasPermissionDirective } from '../../directive/has-permission-directive';
import { UserPermission } from '../../modal/user-permission/user-permission';
import { IPagination } from '../../models/IPagination';
import { UserParams } from '../../models/User';
import { PaginationComponent } from "ngx-bootstrap/pagination";

@Component({
  selector: 'app-admin-list-user',
  imports: [FormsModule, RouterModule, UserPermission, PaginationComponent],
  templateUrl: './admin-list-user.html',
  styleUrl: './admin-list-user.scss'
})
export class AdminListUser implements OnInit{
  
     userParams = new UserParams();
     public data? : IPagination<IAdminUser>;
     pageNumber: number = 1;
     pageSize: 5;
     search: "";
   @ViewChild('search', {static: false}) searchItem: ElementRef
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
    //this.loadAllPermissions();
  }

   loadUsers() {
     this.userService.getUsers(this.userParams.pageNumber, this.userParams.pageSize, this.userParams.search)
       .subscribe(res => {
         this.data = res;
         this.totalCount = res.totalCount;
       });
   }

//   loadAllPermissions() {
//      this.userService.getAllPermissions().subscribe(res => this.allPermissions = res);
//   }

//   loadAllPermissions() {
//   this.userService.getAllPermissions()
//     .subscribe(perms => {
//       perms.forEach(p => this.permissions[p.id] = p.displayName);
//     });
// }

  openPermissionsModal(user: IAdminUser) {
    this.permissionsModal.open(user);
  }

  onPermissionsSaved() {
    this.loadUsers(); 
  }

  onSearch(){
    this.userParams.search = this.searchItem.nativeElement.value;
    this.userParams.pageNumber = 1;
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

  onPageChange(event: any){
     this.userParams.pageNumber = event.page;
//     this.userService.updateUserParams(this.userParams);
     this.loadUsers();
    }

  
  }
