import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { login } from '../login';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private fb: FormBuilder, 
    private usuarioService:UsuarioService, 
    private authService:AuthService,
    private router:Router) {}

  loginForm = this.fb.group({
    username: '',
    password: ''
  })

  onSubmit() {
    const login: login = {
      username: this.loginForm.value.username!,
      password: this.loginForm.value.password!,
    }
    this.usuarioService.login(login).then((response) => {
      this.authService.currentSig.set(response);
      localStorage.setItem('token',response.token)
      this.router.navigateByUrl('/formulario')
    });
  }

}
