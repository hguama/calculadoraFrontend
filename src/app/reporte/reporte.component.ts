import { Component, OnInit } from '@angular/core';
import { ReporteI } from '../modelos/reporte.interface';
import { ConsultaI } from '../modelos/consulta.interface';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})

export class ReporteComponent implements OnInit {

  formGroup!: FormGroup;
  error: any = { isError: false, errorMessage: '' };
  datos!: ReporteI;
  hora: number = 10;
  fi!: Date;
  ff!: Date;
  style_error: string = "visibility: hidden";
  style_success: string = "visibility: hidden";


  constructor(private api: ApiService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  // FormBuilder para manejar el formulario de la vista del usuario con sus validaciones
  private buildForm() {

    this.formGroup = this.formBuilder.group({
      idtecnico: [, [Validators.required, Validators.pattern(/^[a-z\d]+$/)]],
      idservicio: [, [Validators.required, Validators.min(1), Validators.max(2), Validators.pattern(/^[\d]+$/)]],
      fechainicio: [, [Validators.required]],
      fechafin: [, [Validators.required]],

    });

  }

  // método para comparar que fecha inicio sea menor que fecha final
  compareTwoDates() {
    let d3 = this.formGroup.get("fechainicio")?.value;
    let d4 = this.formGroup.get("fechafin")?.value;

    if (d3 == d4 || d4 < d3 || d3 == null || d4 == null) {
      this.error = { isError: true, errorMessage: 'Fecha Fin debe ser MAYOR que Fecha Inicio y no pueden ser iguales' };
    }
    else {
      this.error = { isError: false, errorMessage: 'ok' };
    }


  }

  // método para enviar reporte al Servidor
  addReporte(reporteTecnico: ReporteI) {

    // si los datos ingresados son correctos envía la petición(post) al Servidor
    if (this.formGroup.valid && !this.error.isError) {

      this.api.registrarServicio(reporteTecnico).subscribe(data => {

        this.datos = data;

        // status=0, significa que el servidor retorno error, hubo un error con algún dato enviado del formulario
        if (this.datos.status == 0) {
          this.style_error = "visibility: visible";
          this.style_success = "visibility: hidden";
        }
        else {
          this.style_error = "visibility: hidden";
          this.style_success = "visibility: visible";
          this.formGroup.reset();
        }
        console.log(this.datos);

      })

    } else {
      this.formGroup.markAllAsTouched();
      this.style_success = "visibility: hidden";
      console.log("no se pudo enviar")
    }



  }



}
