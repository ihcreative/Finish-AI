import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LaunchComponent } from './components/launch/launch.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { IntakeComponent } from './components/intake/intake.component';
import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/faq/faq.component';
import { HowItWorksComponent } from './components/how-it-works/how-it-works.component';
import { FounderStoriesComponent } from './components/founder-stories/founder-stories.component';
import { PartnersComponent } from './components/partners/partners.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'launch', component: LaunchComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'intake', component: IntakeComponent },
  { path: 'why-finish', component: AboutComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'how-it-works', component: HowItWorksComponent },
  { path: 'founder-stories', component: FounderStoriesComponent },
  { path: 'partners', component: PartnersComponent },
  { path: '**', redirectTo: '' } // Redirect to home for any other route
];