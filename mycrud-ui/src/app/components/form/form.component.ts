import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Controle } from '../../model/controle';
import { ControleService } from '../../service/controle.service';
import { NgIf } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NavbarComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{

  date = new Date().toISOString().split('T')[0]

  ngOnInit(): void {
    this.usuarioService.fetchUser().then(resp => {
      this.authService.currentSig.set(resp) 
      const chunks = resp.name.split(" ")
      const nomeUsuario = `${chunks[0]} ${chunks[chunks.length - 1]}`.toUpperCase()
      this.controleForm.patchValue({nomeUsuario: nomeUsuario})
    })
  }
  
  controleForm = this.fb.group( {
    data: this.date,
    assunto: ['', Validators.required],
    category: ['', Validators.required],
    nomeUsuario: 'no_value' ,
    description: '',
  })

  sent = false

  constructor(private fb: FormBuilder, 
    private controleService: ControleService, 
    private authService:AuthService,
    private usuarioService:UsuarioService) {}

  onSubmit() {

    console.log('submitted form', this.controleForm.value)

    const controle: Controle = {
      data: this.controleForm.value.data!,
      assunto: this.controleForm.value.assunto!,
      category: this.controleForm.value.category!,
      nomeUsuario: this.controleForm.value.nomeUsuario!,
      description: this.controleForm.value.description!,
    }
    
    if(this.controleForm.status==='VALID'){
      this.controleService.addControle(controle).subscribe(() => this.resetForm());
    }
  }

  resetForm() {
    this.sent = true
    setTimeout(() => {
      this.sent = false;
      this.controleForm.reset();
    }, 1500);
  }

  getHeight(el: HTMLElement): string {
    return (el.scrollHeight+2) + 'px';
  }

}
