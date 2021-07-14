import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConsultaI } from '../modelos/consulta.interface';
import { ConsultardoI } from '../modelos/consulta.resultado';
import { ReporteI } from '../modelos/reporte.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://localhost:8080/api/";
  // url: string = "http://www./api/";

  constructor(private http: HttpClient) { }

  // se regitra el servicio prestado por el técnico
  registrarServicio(reporte: ReporteI): Observable<any> {
    
    return this.http.post<any>(this.url + "reportar", reporte);
  }


  // Se consulta horas trabajadas de un tecnico por número de semana
  consultarTecnico(consulta: ConsultaI): Observable<any> {
    console.log(consulta.idtecnico);
    console.log(consulta.semana);
    return this.http.get<ConsultardoI>(this.url + consulta.idtecnico + "/" + consulta.semana);

  }




}
