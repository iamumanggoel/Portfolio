import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/home'
    },
    {
        path: 'home',
        loadComponent: () => import('./components/dashboards/dashboard.component')
    },
    {
        path: 'about',
        loadComponent: () => import('./pages/about.component')
     },
    {
        path: 'projects',
        loadComponent: () => import('./pages/projects.component')
    },
    {
        path: 'skills',
        loadComponent: () => import('./pages/skills.component')
    },
    {
        path: 'contact',
        loadComponent: () => import('./pages/contact.component')
    }
    
];
