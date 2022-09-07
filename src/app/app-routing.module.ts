import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PrincipalComponent } from './principal/principal.component';
import { UsuarioAutenticadoGuard } from './services/guards/usuario-autenticado.guard';
import { UsuarioNaoAutenticadoGuard } from './services/guards/usuario-nao-autenticado.guard';

const routes: Routes = [
  {path:'login', component: LoginComponent, canActivate: [UsuarioNaoAutenticadoGuard] },
  {
    path: '', component: PrincipalComponent, canActivate: [UsuarioAutenticadoGuard],
      children: [
      {path: '', component: HomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
