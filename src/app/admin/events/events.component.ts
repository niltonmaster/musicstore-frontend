import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon'
import { ConcertService } from '../../shared/services/concert.service';
import { NotificationsService } from 'angular2-notifications';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatTimepickerModule } from '@angular/material/timepicker';



@Component({
  selector: 'app-events',
  imports: [MatTabsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatSelectModule, MatButtonModule, CommonModule, MatIconModule,
    MatDatepickerModule,
    , MatTimepickerModule
    // ,MatDatepickerModule, MatInputModule, MatIconModule, and 
    // MatNativeDateModule
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush, /*Viva carlitos queso en el mundo al revés*/
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {

  nombreArchivo: string = '';
  archivosSeleccionados: FileList | undefined;


  concertService = inject(ConcertService);
  notificationService = inject(NotificationsService);

  file: File | undefined;



  registerForm = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
    hora: new FormControl('', [Validators.required]),
    cantidad: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required]),
    genero: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    // x: new FormControl('', [Validators.required])

  });


  seleccionarArchivo(e: any) {

    this.nombreArchivo = e.target.files[0].name;
    // this.archivosSeleccionados = e.target.files;

    console.log('arhcivo sel', e.target.files)
  }

  subirArchivo() {
    //   console.log(this.archivosSeleccionados.item(0));
    //   this.consultaService.guardarArchivo(this.archivosSeleccionados.item(0)).subscribe(data => {
    //     console.log(data);
    //   })
  }


  imageSrc: string | ArrayBuffer | null = null;

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }


  onFileSelected1(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const selectedFile = input.files[0];
      this.file = selectedFile;
      // this.imageSrc = selectedFile.result;

      console.log('Archivo seleccionado:', selectedFile.name);
    }
  }




  loadSave() {


    const titulo = this.registerForm.controls.titulo.value!
    const descripcion = this.registerForm.controls.descripcion.value!;

    const fecha = this.registerForm.controls.fecha.value!;
    const hora = this.registerForm.controls.hora.value!;
    const cantidadEntradas = this.registerForm.controls.cantidad.value!;
    const precio = this.registerForm.controls.precio.value!;
    const genero = this.registerForm.controls.genero.value!;
    const estado = this.registerForm.controls.estado.value!;

    // const file= this.



    const formData = new FormData();
    formData.append('file', this.file!, this.file!.name);
    formData.append('title', titulo);
    formData.append('descripcion', descripcion);

    formData.append('fecha', fecha);



    formData.append('cantidadEntradas', cantidadEntradas);
    formData.append('precio', precio);
    formData.append('genero', genero);
    formData.append('estado', estado);





    // this.http.post('/api/upload', formData).subscribe(...);




    this.concertService.createEvent(formData).subscribe((res) => {
      this.notificationService.success('Registro exitoso');
      // this.router.navigate(
      //   []
      // )
    })




  }

  cleanFields() {

  }
}
