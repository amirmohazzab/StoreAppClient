import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user-service';
import { IAdminUser } from '../../models/IAdminUser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-detail-user',
  imports: [DatePipe],
  templateUrl: './admin-detail-user.html',
  styleUrl: './admin-detail-user.scss'
})
export class AdminDetailUser implements OnInit{

   user!: IAdminUser;

  constructor(private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.userService.getUserById(id).subscribe(res => {
      this.user = res;
      console.log('user detail', this.user);
    });
  }

}
