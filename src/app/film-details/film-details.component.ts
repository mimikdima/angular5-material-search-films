import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute, Params, ParamMap} from '@angular/router';
import { ConfigService } from '../config.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {
  dataFilm = [];
  hasPoster = true;

  constructor(private activatedRoute: ActivatedRoute ,private configService: ConfigService) {

  this.activatedRoute.params.subscribe((data : Params) => {
     let id = data['filmID']
     this.configService.getDataFilm(id).subscribe(data => {
       this.dataFilm = data
       if(this.dataFilm['Poster'] == 'N/A'){this.hasPoster = false;}
     })
   });

  }

  ngOnInit() {}

  ngOnDestroy() {}

}
