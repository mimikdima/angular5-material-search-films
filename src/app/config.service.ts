import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ConfigService {

  url:string;
  searchList = [];

  constructor(private http:Http){
    this.url = 'http://www.omdbapi.com/?apikey=cd76ebca';
  }

  getFilm(name){
      return this.http.get(this.url + '&type=movie&s=' + name).map(res => res.json());
  }

  getDataFilm(id){
    return this.http.get(this.url + '&type=movie&i=' + id).map(res => res.json());
  }

  listOfFilms(name,filmID){
    this.searchList.find(x => x.filmID === filmID) ? '' : this.searchList.push({'name':name,'filmID':filmID});
  }



}
