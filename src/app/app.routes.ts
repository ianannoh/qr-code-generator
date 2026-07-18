import { Routes } from '@angular/router';
import {HomepageComponent} from '../features/homepage/homepage.component';
import {FormsPageComponent} from '../features/formspage/forms-page.component';
import {FormDetailsComponent} from '../features/form-details/form-details.component';

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
    path: 'form-details',
    component: FormDetailsComponent,
    title: 'Details'
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
