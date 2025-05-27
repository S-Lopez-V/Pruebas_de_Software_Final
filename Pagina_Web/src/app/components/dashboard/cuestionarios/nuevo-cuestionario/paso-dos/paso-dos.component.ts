import { Component, OnInit } from '@angular/core';
import { CuestionarioService } from '../../../../../services/cuestionario.service'
import { Pregunta } from '../../../../../models/pregunta';
import { Cuestionario } from '../../../../../models/cuestionario';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.css'],
  
})
export class PasoDosComponent implements OnInit {
  tituloCuestionario: string;
  descripcionCuestionario: string;
  listPreguntas: Pregunta[] = [];

  constructor(private cuestionarioService: CuestionarioService,
    private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.tituloCuestionario = this.cuestionarioService.tituloCuestionario;
    this.descripcionCuestionario = this.cuestionarioService.descripcionCuestionario;
  }
  guardarPregunta(pregunta: Pregunta): void {
    this.listPreguntas.push(pregunta);
    console.log(this.listPreguntas);
  }

  eliminarPregunta(index: number): void {
    this.listPreguntas.splice(index, 1);
  }

  guardarCuestionario(): void {
    const cuestionario: Cuestionario = {
      nombre: this.tituloCuestionario,
      descripcion: this.descripcionCuestionario,
      listPreguntas: this.listPreguntas
    };

    this.cuestionarioService.guardarCuestionario(cuestionario).subscribe(() => {
      this.toastr.success('El cuestionario fue registrado con éxito', 'Cuestionario registrado!!!')
      this.router.navigate(['/dashboard']);
    }, error => {
      this.toastr.error('Ocurrió un error al guardar el cuestionario', 'Error');
    });

  }

}
