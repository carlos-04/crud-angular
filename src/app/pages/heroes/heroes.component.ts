import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/Models/heroe.model';
import { HeroesService } from 'src/app/services/heroes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];

  cargando = false;
  constructor(private _heroe: HeroesService) { }

  ngOnInit(): void {
    this.cargando = true;
  this._heroe.getHeores().subscribe(resp => {
  this.heroes = resp;
  console.log(this.heroes);
  
  this.cargando = false;
  })
  
  }



  //eliminar heroe 
  deleteHeroe(heroe: HeroeModel, i: number){

Swal.fire({
  icon: 'question',
  title: 'Esta seguro?',
  text: `Esta seguro que desea borrar a ${heroe.nombre}`,
  showConfirmButton:true,
  showCancelButton: true
}).then(resp => {

if(resp.value){
  this.heroes.slice(i,1);   
  this._heroe.deleteHeroe(heroe.id).subscribe();

}

});




  }

}
