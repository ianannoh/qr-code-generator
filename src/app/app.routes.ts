import { Routes } from '@angular/router';
import {HomepageComponent} from '../features/homepage/homepage.component';
import {FormsPageComponent} from '../features/formspage/forms-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    title: 'Staff QR Code',
  },
  {
    path: 'forms',
    component: FormsPageComponent,
    title: 'Forms'
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
