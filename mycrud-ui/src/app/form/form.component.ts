import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Controle } from '../controle';
import { ControleService } from '../controle.service';
import { NgIf } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from '../usuario.service';

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
    inicio: '',
    termino: '',
    ano: new Date().getFullYear().toString(),
    assunto: ['', Validators.required],
    destino: '',
    nomeUsuario: 'no_value' ,
    processoDoc: ['', Validators.required],
    observacoes: '',
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
      inicio: this.controleForm.value.inicio!,
      termino: this.controleForm.value.termino!,
      ano: this.controleForm.value.ano!,
      assunto: this.controleForm.value.assunto!,
      destino: this.controleForm.value.destino!,
      nomeUsuario: this.controleForm.value.nomeUsuario!,
      portaria: '',
      processoDoc: this.controleForm.value.processoDoc!,
      observacoes: this.controleForm.value.observacoes!,
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
