import { Component } from '@angular/core';
import { ControleService } from '../../service/controle.service';
import { HttpClientModule } from '@angular/common/http';
import { Controle } from '../../model/controle';
import { NgFor, NgIf } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { PortariaComponent } from '../portaria/portaria.component';
import { Router } from '@angular/router';
import { ControleDTO } from '../../dto/controle.dto';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [HttpClientModule, NgFor, NgIf, NavbarComponent, PortariaComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  ANO = new Date().getFullYear().toString();
  page = 0;
  last = false;
  first = true;
  length = 0;
  pages = 0;
  size = 0;

  controles:ControleDTO[] = [];

  constructor(private controleService:ControleService, private router:Router) {}

  setAno(ano: string) {
    this.ANO = ano
  }

  setPage(page: number) {
    this.page = page
  }

  nextPage() {
    if(this.page < this.pages - 1){
      this.fetch(this.ANO, this.page + 1)
    }
  }

  previousPage() {
    if(this.page > 0){
      this.fetch(this.ANO, this.page - 1)
    }
  }

  onSubmit() {
    this.fetch(this.ANO, 0)
  }

  fetch(ano:string, page:number) {
    this.controles = []
    this.controleService.getListControle(ano, page).subscribe({
      next: controles => {
        this.controles = this.formatControle(controles.content)
        this.pages = controles.totalPages
        this.length = controles.totalElements
        this.page = controles.number
      },
      error: err => {
        if(err.status === 401){
          this.router.navigateByUrl('/login')
        }
      }
      }
    );
  }

  formatControle(list: ControleDTO[]) {
    return list.map((controle: ControleDTO) => {
      if(controle.assunto === null){
        controle.assunto = "SEM ASSUNTO"
      }
      controle.data = this.formatDateString(controle.data)
      controle.inicio = this.formatDateString(controle.inicio!)
      controle.termino = this.formatDateString(controle.termino!)
      return controle;
    })
  }

  formatDateString(date:string) {
    if(date!=null){
      const chunks = date.split('-')
      const day = chunks[2]
      const month = chunks[1]
      const year = chunks[0]
      return `${day}/${month}/${year}`
    } return ''
  }

}
