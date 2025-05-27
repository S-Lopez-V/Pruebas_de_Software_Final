import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {
  cambiarPassword: FormGroup;
  constructor(private fb: FormBuilder, private toastr:ToastrService) {
    this.cambiarPassword = this.fb.group({
      passwordAnterior: ['', Validators.required],
      nuevaPassword: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword:['']

    }, {validators: this.checkPassword})
   }

  ngOnInit(): void {
    
  }
  checkPassword(group: FormGroup): any{
    const pass = group.controls.nuevaPassword.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : {notSame:true}
  }
   guardarPassword(): void {
    if (this.cambiarPassword.invalid) {
      this.toastr.error('Por favor completá correctamente el formulario', 'Error');
      return;
    }

    // Aquí iría el llamado a un servicio real si existiera
    this.toastr.success('La contraseña fue cambiada con éxito', 'Éxito');
    this.cambiarPassword.reset();
  }
}
