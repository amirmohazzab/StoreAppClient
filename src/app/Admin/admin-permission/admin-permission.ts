import { Component } from '@angular/core';
import { IPermission } from '../../models/IPermission';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PermissionService } from '../../services/permission-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-permission',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-permission.html',
  styleUrl: './admin-permission.scss'
})
export class AdminPermission {

  permissions: IPermission[] = [];
  form: FormGroup;
  editing?: IPermission;

  constructor(private svc: PermissionService, private toast: ToastrService) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.svc.getAll().subscribe(res => this.permissions = res);
  }

  startEdit(p: IPermission) {
    this.editing = p;
    this.form.patchValue(p);
  }

  cancelEdit() {
    this.editing = undefined;
    this.form.reset();
  }

  save() {
    if (this.form.invalid) return;
    const dto = this.form.value;
    if (this.editing) {
      dto.id = this.editing.id;
      this.svc.update(this.editing.id, dto).subscribe(() => {
        this.toast.success('Permission updated');
        this.load();
        this.cancelEdit();
      });
    } else {
      this.svc.create(dto).subscribe(() => {
        this.toast.success('Permission created');
        this.load();
        this.form.reset();
      });
    }
  }

  remove(id: number) {
    if (!confirm('Delete permission?')) return;
    this.svc.delete(id).subscribe(() => {
      this.toast.info('Deleted');
      this.load();
    });
  }
}
