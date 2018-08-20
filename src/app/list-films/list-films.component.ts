import { Component, OnInit, Input } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';
import { StatelessService } from '../stateless.service';

@Component({
  selector: 'list-films',
  templateUrl: './list-films.component.html',
  styleUrls: ['./list-films.component.css']
})
export class ListFilmsComponent implements OnInit {

   @Input() filmName: string;
   searchList = [];


  constructor( private router: Router, private statelessService:StatelessService ) {
    this.searchList = this.statelessService.searchList;
  }

  ngOnInit() {}

  deleteFromList(index){
    this.searchList.splice(index,1);
  }
  goToDetails(filmID:string){
    this.router.navigate(['/details', filmID]);
  }
}
