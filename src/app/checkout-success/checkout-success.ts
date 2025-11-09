import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout-success',
  imports: [RouterLink],
  templateUrl: './checkout-success.html',
  styleUrl: './checkout-success.scss'
})
export class CheckoutSuccess {

  status : 'failed' | 'cancelled' | 'success' | 'unknown' = 'unknown';

  constructor(private router: ActivatedRoute){
    this.status = this.router.snapshot.queryParamMap.get('status') as any;
  }

  
}
