import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AgendaService } from '../agenda.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-agenda-form',
  templateUrl: './agenda-form.component.html',
  styleUrl: './agenda-form.component.css'
})
export class AgendaFormComponent implements OnInit{
  formGroupAgendas: FormGroup;

  isEditing: boolean = false;
  constructor(
    private FormBuilder: FormBuilder,
    private service: AgendaService,
    private router: Router,
    private activatedRoute: ActivatedRoute){

    this.formGroupAgendas = FormBuilder.group({
      id: [''],
      namecommitment: [''],
      localcommitment: [''],
      horacommitment: [''],
      date: [''],
    })};

    ngOnInit(): void {
      const id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
      if (id != 0) {
        this.loadAgendas(id);
        this.isEditing = true;
      }
    }
    loadAgendas(id: number) {
      this.service.getAgendasById(id).subscribe({
        next: data => this.formGroupAgendas.setValue(data)
        })
    };

  save() {
    this.service.save(this.formGroupAgendas.value).subscribe({
    next:()=> this.router.navigate(['agenda'])
  })

  }
  update(){
    this.service.update(this.formGroupAgendas.value).subscribe({
      next:()=> this.router.navigate(['agenda'])
  });
}}
