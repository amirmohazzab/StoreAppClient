import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import {provideToastr} from 'ngx-toastr';
import { loadingInterceptor } from './app/interceptors/loading-interceptor';
import { errorHandlingInterceptor } from './app/interceptors/error-handling-interceptor';

const spinnerConfig = {
  type: 'ball-spin-clockwise',
  size: 'medium',
  color: '#fff',
  bdColor: 'rgba(0,0,0,0.8)',
  fullScreen: true
};

bootstrapApplication(App, {
  providers: [
    provideHttpClient(
      withInterceptors([
       loadingInterceptor //errorHandlingInterceptor, 
      ])
    ),
    provideRouter(routes),
    BrowserModule,
    //importProvidersFrom(NgxSpinnerModule),
    provideAnimations(),
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
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

  