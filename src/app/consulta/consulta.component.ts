import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { ConsultaI } from '../modelos/consulta.interface';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ConsultardoI } from '../modelos/consulta.resultado';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {
  myForm!: FormGroup;
  datos!: ConsultardoI;
  bandera: boolean = true;
  style1: string = "visibility: hidden";


  constructor(public fb: FormBuilder, private api: ApiService, private router: Router) { }

  errorStatus: boolean = true;
  errorMsj: any = "";

  ngOnInit(): void {

    this.datos = {
      total_horas: "",
      horas_dominicales: "",
      horas_dominicales_extra: "",
      horas_nocturnas: "",
      horas_nocturnas_extra: "",
      horas_normales: "",
      horas_normales_extra: "",
      id_tecnico: "",
      semana: "",
    };

    // Se crea el FormGroup con sus controles y validaciones
    this.myForm = this.fb.group({
      idtecnico: ['', [Validators.required, Validators.pattern(/^[a-z\d]+$/)]],
      semana: ['', [Validators.required, Validators.min(0), Validators.pattern(/^[\d\-d]+$/)]],

    });

  }


  //Realiza la consulta del Usuario por idtecnico y por semana
  addConsulta(con: ConsultaI) {

    // si el formulario es valido realiza la consulta al Servidor
    if (this.myForm.valid) {
      
      this.style1 = "visibility: visible";
      
      this.api.consultarTecnico(con).subscribe(data => {
        this.datos = data;
        console.log(data);
      })
    }

    // Si hay errores en validación de formularios
    else {
      this.style1 = "visibility: hidden";
      console.log("hay campos sin llenar");
      this.myForm.markAllAsTouched();
    }


  }

// método para pruebas
  saveData() {

    if (this.myForm.valid) {
      const value = this.myForm.value;
      console.log(value);
      console.log("PASO AL FIN")
    } else {
      this.myForm.markAllAsTouched();
      this.myForm.touched
      console.log("falta llenar datos");
    }
  }


}
