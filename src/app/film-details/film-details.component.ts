import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, ParamMap} from '@angular/router';
import { StatelessService } from '../stateless.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.css']
})
export class FilmDetailsComponent implements OnInit {
  dataFilm = [];
  hasPoster = true;

  constructor(private activatedRoute: ActivatedRoute ,private statelessService: StatelessService) {

  this.activatedRoute.params.subscribe((data : Params) => {
     let id = data['filmID']
     this.statelessService.getDataFilm(id).subscribe(data => {
       this.dataFilm = data
       if(this.dataFilm['Poster'] == 'N/A'){this.hasPoster = false;}
     })
   });
  }

  ngOnInit() {}

  ngOnDestroy() {}

}
