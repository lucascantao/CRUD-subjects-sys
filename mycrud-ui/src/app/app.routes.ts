import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { PortariaComponent } from './portaria/portaria.component';

export const routes: Routes = [
    {path: '', redirectTo: '/formulario', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'formulario', component: FormComponent, canActivate: [authGuard]},
    {path: 'buscar', component: SearchComponent, canActivate: [authGuard]},
    {path: 'portaria/:id', component: PortariaComponent}
];
