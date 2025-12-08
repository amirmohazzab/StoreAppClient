import { Component } from '@angular/core';
import { AccountService } from '../../services/account-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  imports: [RouterModule],
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.scss'
})
export class AdminHeader {

  constructor(private accountService: AccountService){}

showToast() {
  // Load Bootstrap Toast
  // @ts-ignore
  const toastEl = document.getElementById('adminToast');
  // @ts-ignore
  const toast = new bootstrap.Toast(toastEl);
  toast.show();
}

ngOnInit() {
  const savedMode = localStorage.getItem('dark-mode');
  if (savedMode === 'enabled') {
    document.body.classList.add('dark-mode');
  }
}

toggleDarkMode() {
  document.body.classList.toggle('dark-mode');

  const enabled = document.body.classList.contains('dark-mode');
  localStorage.setItem('dark-mode', enabled ? 'enabled' : 'disabled');
}

 logout(){
    this.accountService.logout();

  }
}
