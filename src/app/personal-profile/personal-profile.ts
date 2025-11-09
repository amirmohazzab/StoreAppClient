import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile-service';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { IAddress } from '../models/Address';

@Component({
  selector: 'app-personal-profile',
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './personal-profile.html',
  styleUrl: './personal-profile.scss'
})
export class PersonalProfile implements OnInit {

  profileForm: FormGroup;
  userProfile: IAddress | null = null;
  title: string = "Personal Profile";
  constructor(private profileService: ProfileService, private toast: ToastrService, private fb: FormBuilder){}

  ngOnInit(): void {
    this.createProfileForm();
    this.loadProfile();
  }

  createProfileForm() {
    this.profileForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      number: [''],
      city: [''],
      state: [''],
      fullAddress: [''],
      postalCode: ['']
    });
  }

  
  loadProfile() {
    this.profileService.getUserProfile().subscribe({
      next: (res: IAddress) => {
        if (res) {
          this.profileForm.patchValue(res);
          console.log('Form value after patch:', this.profileForm.value);
        }
      }
    });
  }


  onSubmit() {
    if (this.profileForm.invalid) {
    console.warn('Form is invalid');
    return;
    }
  console.log('Submitted form data:', this.profileForm.value);

      this.profileService.updateUserProfile(this.profileForm.value).subscribe({
    next: () => this.toast.success('Profile updated successfully!'),
    error: () => this.toast.error('Failed to update profile.')
  });
  }


}
