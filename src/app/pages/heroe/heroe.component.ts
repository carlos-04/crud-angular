import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import{HeroeModel} from '../../Models/heroe.model'
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss']
})
export class HeroeComponent implements OnInit {

 heroe:HeroeModel  = new HeroeModel();

  constructor(private _heroe : HeroesService, private _activedRouter: ActivatedRoute ) {


   }

  ngOnInit(): void {

  const id =   this._activedRouter.snapshot.paramMap.get('id');
     console.log(id);

   if(id !== 'nuevo'){

    this._heroe.getHeroe(id).subscribe((resp:HeroeModel) => {

    this.heroe = resp;
    this.heroe.id = id;
    })
   }
  
  }





  guardar(form: NgForm){

   if(form.invalid){
     
    console.log('Formulario no valido');
    return;
     
   }
   
   
   Swal.fire({
    icon: 'info',
    title: 'Porfavor Espere...',
    text: 'Guardando Datos',

  });


//Inicia el swal/
  Swal.showLoading();


// if (this.heroe.id){

//   this._heroe.actualizarHero(this.heroe).subscribe(resp => {

//     console.log(resp);
//   })

// }else{

//    this._heroe.crear(this.heroe).subscribe(resp => {
//   this.heroe = resp;
//    });
  
//   }
let peticion: Observable<any>;


if(this.heroe.id){

peticion = this._heroe.actualizarHero(this.heroe);
}else {

  peticion = this._heroe.crear(this.heroe);
}

peticion.subscribe(resp => {
 
  
  Swal.fire({
icon:'success',
    title: this.heroe.nombre,
text: "Se Actualizo correctamente",


  });

})

  }

}
