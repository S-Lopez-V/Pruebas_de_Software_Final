import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  login: FormGroup


  constructor( private fb: FormBuilder,
                private toastr: ToastrService, 
                private router:Router) { 
    this.login = this.fb.group({
      usuario: ['',Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }
  log():void{
    console.log(this.login)

    const usuario: Usuario = {
      nombreUsuario: this.login.value.usuario,
      password: this.login.value.password,

    }
    this.loading = true;
    setTimeout(()=>{
      if (usuario.nombreUsuario === 'pruebas' && usuario.password === '12345'){
        this.login.reset()
        this.router.navigate(['/dashboard']);
        this.toastr.success('Ha iniciado sesion con exito', 'Correcto')
      }else(
        this.toastr.error('usuario o contraseña incorrecto', 'Error'),
        this.login.reset()
      )
      this.loading = false;
    },3000) 
    console.log(usuario);
  }
}
