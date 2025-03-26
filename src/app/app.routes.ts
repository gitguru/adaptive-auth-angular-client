import { Routes } from '@angular/router';
import { TimestampComponent } from './timestamp.component';
import { HomeComponent } from './home.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'timestamp',
        component: TimestampComponent,
    },
];
