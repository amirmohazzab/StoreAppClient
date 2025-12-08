import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IPermission } from '../../models/IPermission';
import { RoleService } from '../../services/role-service';
import { PermissionService } from '../../services/permission-service';
import { ActivatedRoute, Router } from '@angular/router';
import { IRole } from '../../models/IRole';

@Component({
  selector: 'app-admin-role-form',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-role-form.html',
  styleUrl: './admin-role-form.scss'
})
export class AdminRoleForm implements OnInit{

  form: FormGroup;
  permissions: IPermission[] = [];
  roleId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      name: [''],
      permissions: [[]]
    });
  }

  ngOnInit(): void {
    this.permissionService.getAll().subscribe(p => this.permissions = p);

    this.roleId = this.route.snapshot.paramMap.get('id');
    if (this.roleId) {
      this.roleService.getRoleById(this.roleId).subscribe(r => this.form.patchValue(r));
    }
  }

  onPermissionChange(event: any) {
  const permissions = this.form.value.permissions as string[];
  if (event.target.checked) {
    permissions.push(event.target.value);
  } else {
    const index = permissions.indexOf(event.target.value);
    if (index >= 0) permissions.splice(index, 1);
  }
  this.form.patchValue({ permissions });
}

  save() {
    const role: IRole = this.form.value;
    if (this.roleId) {
      this.roleService.updateRole(this.roleId, role).subscribe(() => this.router.navigate(['/admin/role']));
    } else {
      this.roleService.createRole(role).subscribe(() => this.router.navigate(['/admin/role']));
    }
  }
}
