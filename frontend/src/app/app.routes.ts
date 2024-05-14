import { Routes } from '@angular/router';
import { RecipesListComponent } from './components/pages/recipes-list/recipes-list.component';
import { CreateReceptComponent } from './components/pages/create-recept/create-recept.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { RecipeComponent } from './components/pages/recipe/recipe.component';

export const routes: Routes = [
    {path: 'recepti', component: RecipesListComponent},
    {path: 'recept/:id', component: RecipeComponent},
    {path: 'create', component: CreateReceptComponent},
    {path: '', redirectTo: '/recepti', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];
