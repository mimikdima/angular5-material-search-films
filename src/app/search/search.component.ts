import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';
import { MatOptionSelectionChange } from '@angular/material';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

    @Output() filmN;

    myControl = new FormControl();
    filteredOptions: Observable<any>;
    searchFilms = [];
    searchList = [];

  constructor(private configService:ConfigService) {
      this.myControl.valueChanges
      .distinctUntilChanged()
      .debounceTime(400)
      .switchMap(event => this.configService.getFilm(event))
      .subscribe(
        data => {
          console.log(data)
          //  this.configService.getFilm(data).subscribe(response =>{
              if((<any>data).Response == 'True'){
                this.searchFilms = (<any>data).Search;
                  this.filteredOptions = this.myControl.valueChanges
                   .startWith('')
                   .map(title => title.length >= 1 ? this.filter(title): title)
                   .map(film => film && typeof film === 'object' ? film.Title : film)
                   .map(title => title ? this.filter(title) : this.searchFilms.slice());
                 }else{
                   this.filteredOptions = Observable.empty<Response>();
                  }
      })
  }

  ngOnInit() {}

  addToList(film:MatOptionSelectionChange,filmID:string){
    this.configService.listOfFilms(film,filmID)
  }


  filter(title: string) {
    return this.searchFilms.filter(option => title);
  }

  displayFn(user): string {
     return user ? user.title : user;
  }

}
