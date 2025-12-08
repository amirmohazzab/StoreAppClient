import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile-service';
import { ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, FormsModule } from '@angular/forms';
import { IAddress } from '../models/Address';
import { AccountService } from '../services/account-service';
import Swal from 'sweetalert2';

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

  avatarUrl: string = "";
  previewUrl: any = null;
  isDragging = false;

  constructor(
    private profileService: ProfileService, 
    private toast: ToastrService, 
    private fb: FormBuilder, 
    private accountService: AccountService)
    {}

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
           this.avatarUrl = res.avatarUrl ?? "";
          console.log('Form value after patch:', this.profileForm.value);
        }
      }
    });
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    const file = event.dataTransfer?.files[0];
    if (file) this.upload(file);
  }


  onSubmit() {
    if (this.profileForm.invalid) {
    console.warn('Form is invalid');
    return;
    }
    this.profileService.updateUserProfile(this.profileForm.value).subscribe({
      next: () => this.toast.success('Profile updated successfully!'),
      error: () => this.toast.error('Failed to update profile.')
  });
  }

  upload(file: File) {
    // preview
    const reader = new FileReader();
    reader.onload = () => (this.previewUrl = reader.result);
    reader.readAsDataURL(file);

    this.accountService.uploadAvatar(file).subscribe({
      next: (res: any) => {
        this.avatarUrl = res.url;
        Swal.fire("Success", "Profile image updated!", "success");
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) this.upload(file);
  }


}
