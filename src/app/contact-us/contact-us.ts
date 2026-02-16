import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HomeService } from '../services/home-service';
import { ToastrService } from 'ngx-toastr';
import { ContactMessage } from '../models/ContactMessage';
import { ProfileService } from '../services/profile-service';

@Component({
  selector: 'app-contact-us',
  imports: [FormsModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.scss'
})
export class ContactUs {

  model: ContactMessage = {
    name: '',
    email: '',
    message: '',
    subject: ''
  };
  
  file: File | null = null;
  filePreviewUrl: string | null = null;

constructor(private homeService: HomeService, private profileService: ProfileService, private toast: ToastrService){}

submit() {
  const formData = new FormData();
  formData.append('name', this.model.name);
  formData.append('email', this.model.email);
  formData.append('subject', this.model.subject);
  formData.append('message', this.model.message);
  if (this.file) formData.append('attachment', this.file);

  this.profileService.sendMessage(formData).subscribe(() => {
    this.model = { name: '', email: '', subject: '', message: '' };
    this.removeFile(document.querySelector<HTMLInputElement>('input[type="file"]')!);
    this.toast.success('Message Sent');
  });
}


onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.file = input.files[0];

    if (this.file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.filePreviewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.file);
    } else {
      this.filePreviewUrl = null;
    }
  }
}

removeFile(input?: HTMLInputElement) {
  this.file = null;
  this.filePreviewUrl = null;
  if (input) input.value = ''; 
}




}
