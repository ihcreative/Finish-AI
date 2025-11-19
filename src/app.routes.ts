
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IntakeComponent } from './components/intake/intake.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { FaqComponent } from './components/faq/faq.component';
import { AboutComponent } from './components/about/about.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'intake', component: IntakeComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' } // Redirect to home for any other route
];
