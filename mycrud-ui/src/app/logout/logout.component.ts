import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit{

  constructor(private usuarioService:UsuarioService, private router:Router) {}

  nome:string = ''

  ngOnInit(): void {
      this.usuarioService.fetchUser().then(resp => {
        console.log('user', resp)
        const name:string[] = resp.name.split(' ')
        this.nome = name[0] + " " + name[name.length - 1]
      })
  }
  onLogout() {
    localStorage.setItem('token', '')
    this.router.navigateByUrl('/login')
    // location.reload()
  }

}
