import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { register } from '../register';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  constructor(
    private fb: FormBuilder, 
    private usuarioService:UsuarioService, 
    private authService:AuthService,
    private router:Router) {}

  registerForm = this.fb.group({
    username: '',
    email: '',
    password: ''
  })

  onSubmit() {
    const register: register = {
      username: this.registerForm.value.username!,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
    }
    this.usuarioService.register(register).then((response) => {
      this.router.navigateByUrl('/login')
    });
  }
}
