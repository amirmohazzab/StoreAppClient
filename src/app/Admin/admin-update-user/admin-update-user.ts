import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user-service';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { IAdminUser} from '../../models/IAdminUser';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-update-user',
  imports: [FormsModule],
  templateUrl: './admin-update-user.html',
  styleUrl: './admin-update-user.scss'
})
export class AdminUpdateUser implements OnInit {

  user!: IAdminUser;
  form: FormGroup;
  
  constructor(
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private userService: UserService, 
    private router: Router, 
    private toast: ToastrService) {
      //  this.form = this.fb.group({
      //   username: [''],
      //   email: [''],
      //   role: ['']
      // });
    }

    
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
     console.log("ROUTE ID:", id);
    this.userService.getUserById(id).subscribe(user => {
       console.log("Edit API USER:", user);
      this.user = user;

      // this.form.patchValue({
      //   userName: user.userName,
      //   email: user.email,
      //   role: user.role
      // });
    });
    //this.form.patchValue(user)
  }

  save() {
      const data = {
        id: this.user.id,
        userName: this.user.userName,
        email: this.user.email,
        role: this.user.role,
        isActive: this.user.isActive
      };
    this.userService.updateUser(this.user.id, data).subscribe(() => {
      this.toast.success("User updated");
      this.router.navigate(['/admin/user']);
    });
  }

}
