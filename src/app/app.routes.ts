import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Temperature } from './pages/temperature/temperature';
import { Humidity } from './pages/humidity/humidity';
import { Settings } from './pages/settings/settings';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },

    {
        path: 'home',
        component: Dashboard,
        title: 'Dashboard'
    },

    {
        path: 'temperature',
        component: Temperature,
        title: 'Temperatuur'
    },

    {
        path: 'humidity',
        component: Humidity,
        title: 'Luchtvochtigheid'
    },

    {
        path: 'settings',
        component: Settings,
        title: 'Instellingen'
    },

    // fallback
    { path: '**', redirectTo: 'home' }
];
