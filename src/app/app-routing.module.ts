import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaComponent } from './consulta/consulta.component';
import { HomeComponent } from './home/home.component';
import { ReporteComponent } from './reporte/reporte.component';


const routes: Routes = [
{path:"home",component:HomeComponent},
{path:"reportar",component:ReporteComponent},
{path:"consultar",component:ConsultaComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
