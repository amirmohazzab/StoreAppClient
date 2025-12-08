import { Component, OnInit } from '@angular/core';
import { RoleService } from '../../services/role-service';
import { IRole } from '../../models/IRole';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-role-list',
  imports: [],
  templateUrl: './admin-role-list.html',
  styleUrl: './admin-role-list.scss'
})
export class AdminRoleList implements OnInit{

  roles: IRole[] = [];

  constructor(private roleService: RoleService, private router: Router) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getRoles().subscribe(res => this.roles = res);
  }

  editRole(id: string) {
    this.router.navigate(['/admin/role/edit', id]);
  }

  deleteRole(id: string) {
    if (confirm('Are you sure?')) {
      this.roleService.deleteRole(id).subscribe(() => this.loadRoles());
    }
  }
}
