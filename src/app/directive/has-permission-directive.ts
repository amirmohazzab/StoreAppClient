import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountService } from '../services/account-service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective implements OnInit{

  @Input() appHasPermission!: string | string[];

  constructor(
    private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef,
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    this.accountService.currentUser$.subscribe(user => {
      
      const userPerms = user?.permission ?? [];

      const required = Array.isArray(this.appHasPermission)
        ? this.appHasPermission
        : [this.appHasPermission];

      const allow = required.some(p => userPerms.includes(p));

      this.vcr.clear();
      if (allow) {
        this.vcr.createEmbeddedView(this.tpl);
      }
    });
  }

  //private permissionService: PermissionService

  // private permission: string = '';
  // @Input() set appHasPermission(permission: string) {
  //   this.permission = permission;
  //   this.updateView();
  // }

  // private updateView() {
  //   if (this.permissionService.hasPermission(this.permission)) {
  //     this.vcr.createEmbeddedView(this.tpl);
  //   } else {
  //     this.vcr.clear();
  //   }
  // }

}
