import { Routes } from '@angular/router';
import { RecipesListComponent } from './components/recipes-list/recipes-list.component';
import { CreateReceptComponent } from './components/create-recept/create-recept.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    {path: 'recepti', component: RecipesListComponent},
    {path: 'create', component: CreateReceptComponent},
    {path: '', redirectTo: '/recepti', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];
