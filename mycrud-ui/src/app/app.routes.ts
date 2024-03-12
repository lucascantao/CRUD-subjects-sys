import { Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './utils/auth.guard';
import { PortariaComponent } from './components/portaria/portaria.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'formulario', component: FormComponent, canActivate: [authGuard]},
    {path: 'buscar', component: SearchComponent, canActivate: [authGuard]},
    {path: 'portaria/:id', component: PortariaComponent}
];
