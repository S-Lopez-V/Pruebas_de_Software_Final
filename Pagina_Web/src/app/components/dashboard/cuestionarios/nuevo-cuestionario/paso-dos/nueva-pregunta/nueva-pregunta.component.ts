import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Pregunta } from '../../../../../../models/pregunta';
import { ToastrService } from 'ngx-toastr';
import { Respuesta } from '../../../../../../models/respuesta';


@Component({
  selector: 'app-nueva-pregunta',
  templateUrl: './nueva-pregunta.component.html',
  styleUrls: ['./nueva-pregunta.component.css']
})
export class NuevaPreguntaComponent implements OnInit {
  nuevaPregunta: FormGroup;
  pregunta: Pregunta;
  rtaCorrecta = 0;

  @Output() enviarPregunta = new EventEmitter<Pregunta>();

  constructor(private fb: FormBuilder,
    private toastr: ToastrService) {
    this.nuevaPregunta = this.fb.group({
      titulo: ['', Validators.required],
      respuestas: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.agregarRespuestaDefecto();

  }
  //devulve el formArray de respuestas
  get getRespuestas(): FormArray {
    return this.nuevaPregunta.get('respuestas') as FormArray;
  }
  // agregar respuesta al array
  agregarRespuesta(): void {
    this.getRespuestas.push(this.fb.group({
      descripcion: ['', Validators.required],
      //esCorrecta: 0
    }));

  }
  agregarRespuestaDefecto(): void {
    this.agregarRespuesta();
    this.agregarRespuesta();
  }

  eliminarRespuesta(index: number): void {
    if (this.getRespuestas.length === 2) {
      this.toastr.error('Como minimo la pregunta debe contener dos respuestas', 'ERROR!!!')
    } else {
      this.getRespuestas.removeAt(index);
    }
  }

  setRespuestaValida(index: number): void {
    this.rtaCorrecta = index
  }

  agregarPregunta(): void {
    //obtener titulo
    const descripcionPregunta = this.nuevaPregunta.get('titulo')?.value;
    const arrayRespuestas = this.nuevaPregunta.get('respuestas')?.value;
    const arrayRta: Respuesta[] = [];

      arrayRespuestas.forEach((element: any, index: number) => {
        const esCorrecta = index === this.rtaCorrecta;
        const respuesta = new Respuesta(element.descripcion, esCorrecta);
        arrayRta.push(respuesta);
      });

   

    const pregunta: Pregunta = new Pregunta(descripcionPregunta, arrayRta)

    this.enviarPregunta.emit(pregunta);
    this.reset();
  }
  reset(): void {
    this.nuevaPregunta.reset();

    while (this.getRespuestas.length !== 0) {
      this.getRespuestas.removeAt(0);
    }
    this.agregarRespuestaDefecto();
  }

}

