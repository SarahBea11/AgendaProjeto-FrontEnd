import { Component, OnInit } from '@angular/core';
import { AgendaService } from '../agenda.service';
import { Agendas } from './agenda';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css'
})
export class AgendaComponent implements OnInit {

  Agendas: Agendas[] = []

  constructor(private service: AgendaService, private router: Router ,){}

  ngOnInit(): void{
    this.loadAgendas();
  }

  loadAgendas(){
    this.service.getAgendas().subscribe({
      next: data => this.Agendas = data
    })
  }
   delete (Agendas: Agendas){
    this.service.delete(Agendas).subscribe({
      next: ()=> this.loadAgendas()
    })
  }
  create(){
    this.router.navigate(['agenda-form'])
  }
  }
