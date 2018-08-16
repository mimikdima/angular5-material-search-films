import { Component, OnInit ,EventEmitter, Output} from '@angular/core';
import { FormBuilder, FormGroup,FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConfigService } from '../config.service';
import { MatOptionSelectionChange } from '@angular/material';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

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

  constructor(private configService:ConfigService) { }

  ngOnInit() {}



  addToList(film:MatOptionSelectionChange,filmID:string){
    this.configService.listOfFilms(film,filmID)
  }


  getListFilms(event :string){

  if(event.length >= 2 || event != null){
    this.myControl.valueChanges
    .debounceTime(400)
    //.switchMap()
    .subscribe(data => {
          this.configService.getFilm(data).subscribe(response =>{
            if((<any>response).Response == 'True'){
              this.searchFilms = (<any>response).Search;
          //  console.log((<any>response).Response);
              this.filteredOptions = this.myControl.valueChanges
                 .startWith('')
                 .map(Title => Title.length >= 1 ? this.filter(Title): Title)
                 .map(film => film && typeof film === 'object' ? film.Title : film)
                 .map(Title => Title ? this.filter(Title) : this.searchFilms.slice());
               }
           })
      })
    }else{
      this.filteredOptions = Observable.empty<Response>();
    }
  }

  filter(Title: string) {
     return this.searchFilms.filter(option => Title);
  }

  displayFn(user): string {
     return user ? user.Title : user;
  }

}
