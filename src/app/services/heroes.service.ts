import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HeroeModel } from '../Models/heroe.model';
import {delay, map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class HeroesService {


private url = "https://crud-3873d.firebaseio.com";

  constructor(private http: HttpClient) { }


//Crear un usuario
  crear(heroe: HeroeModel){
    return this.http.post(`${this.url}/heroes.json`, heroe).pipe(map( (resp: any) => {

      heroe.id = resp.name;
      return heroe;

    } ));

  }
  //Actualizar Heroe

  actualizarHero (heroe: HeroeModel){

  const heroeTem: HeroeModel =  {
     
    //este es el operador express y lo que hace es que me trae todas las propiedades del modelo Heroe
    ...heroe
    
    
    };

   delete heroeTem.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTem);
  }
//obteniendo los datos de un heroe en especifico
getHeroe(id: any){

  return this.http.get( `${this.url}/heroes/${id}.json`);
}

  //Obtener Listado de heroes 
  getHeores(){

    return this.http.get(`${this.url}/heroes.json`).pipe(map( resp => this.crearArreglo(resp)),
                                                    delay(2000));
  }


  // Eliminar Heroe

  deleteHeroe(id: string){

  return  this.http.delete(`${this.url}/heroes/${id}.json`);
  }
  
//convirtiendo los objetos en un arreglo
  private crearArreglo(heroesObj: object){

   
    const heroes:HeroeModel[] = [];

    console.log(heroesObj);
   
     Object.keys(heroesObj).forEach(key => {
       const heroe: HeroeModel = heroesObj[key];
       heroe.id = key;

       heroes.push(heroe);
     })


  if(heroesObj === null){
    return [];
  }

return heroes;


  }
}
