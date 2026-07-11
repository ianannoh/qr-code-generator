import { Routes } from '@angular/router';
import {HomepageComponent} from '../features/homepage/homepage.component';
import {FormspageComponent} from '../features/formspage/formspage.component';

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
    title: 'Staff QR Code',
  },
  {
    path: 'forms',
    component: FormspageComponent,
    title: 'Forms'
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
