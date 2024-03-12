import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Controle } from '../model/controle';
import { ControleService } from '../service/controle.service';
import { ActivatedRoute } from '@angular/router';
import { ControleDTO } from '../dto/controle.dto';

@Component({
  selector: 'app-portaria',
  standalone: true,
  imports: [NgIf],
  templateUrl: './portaria.component.html',
  styleUrl: './portaria.component.css'
})
export class PortariaComponent implements OnInit {
  
    @Input() controle!: ControleDTO;

    protected edit = false;

    constructor(private controleService: ControleService, private route: ActivatedRoute) {}

    ngOnInit(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'))
      this.controleService.getControle(id).subscribe(resp => {
        console.log(resp)
        this.controle = resp
      });
    }
    
    DDmmYYYY(date:string) {
      const chunks = date.split('-')
      const day = chunks[2]
      const month = chunks[1]
      const year = chunks[0]
      return `${day}/${month}/${year}`
    }

    saveControle() {
      this.controleService.saveControle(this.controle).subscribe({
        next: resp => console.log(resp),
        error: resp => console.log(resp)
      })
      this.toogleEdit()
    }

    setAssunto(value: string) {
      this.controle.assunto = value;
    }

    toogleEdit() {
      this.edit = !this.edit;
    }

}
