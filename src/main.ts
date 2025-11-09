import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ModalModule } from 'ngx-bootstrap/modal';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import {provideToastr} from 'ngx-toastr';
import { loadingInterceptor } from './app/interceptors/loading-interceptor';
import { errorHandlingInterceptor } from './app/interceptors/error-handling-interceptor';
import { authJWTTokenInterceptor } from './app/interceptors/auth-jwttoken-interceptor';
import { importProvidersFrom } from '@angular/core';


const spinnerConfig = {
  type: 'ball-spin-clockwise',
  size: 'medium',
  color: '#fff',
  bdColor: 'rgba(0,0,0,0.8)',
  fullScreen: true
};


bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
       authJWTTokenInterceptor, loadingInterceptor, // errorHandlingInterceptor
      ])
    ),
    
    //BrowserModule,
    //importProvidersFrom(NgxSpinnerModule),
    provideAnimations(),
    importProvidersFrom(ModalModule.forRoot()),
    //MatSidenav,
    //MatSidenavContainer,
    //MatSidenavContent,
    provideToastr({
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'increasing'
    }),
  ]
})
  .catch((err) => console.error(err));

  