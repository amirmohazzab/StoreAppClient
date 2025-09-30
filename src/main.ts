import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(
      withInterceptors([
        
      ])
    ),
    provideRouter(routes),
    BrowserModule,
    provideAnimations(),
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
  ]
})
  .catch((err) => console.error(err));

  