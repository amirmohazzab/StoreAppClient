import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from '../../services/account-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  imports: [RouterModule],
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.scss'
})
export class AdminHeader {

  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() darkModeChanged = new EventEmitter<void>();
  
  constructor(private accountService: AccountService){}

showToast() {
  // Load Bootstrap Toast
  // @ts-ignore
  const toastEl = document.getElementById('adminToast');
  // @ts-ignore
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}

// ngOnInit() {
//   const savedMode = localStorage.getItem('admin-dark-mode');
//   if (savedMode === 'enabled') {
//     document.body.classList.add('dark-mode');
//   }
// }

toggleDarkMode() {
  // document.body.classList.toggle('admin-dark-mode');

  // const enabled = document.body.classList.contains('dark-mode');
  // localStorage.setItem('admin-dark-mode', enabled ? 'enabled' : 'disabled');
  this.darkModeChanged.emit();
}

 logout(){
    localStorage.removeItem('admin-dark-mode');
    //document.body.classList.remove('dark-mode');
    this.accountService.logout();
  }
}
