import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { MatFormFieldModule, MatInputModule, MatListModule,MatIconModule } from '@angular/material';

import { StatelessService } from './stateless.service';
import { AppComponent } from './app.component';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { SearchComponent } from './search/search.component';
import { ListFilmsComponent } from './list-films/list-films.component';

const appRoutes: Routes = [
  {path: 'details/:filmID', component: FilmDetailsComponent},
  {path: "", redirectTo: "/", pathMatch: "full"}
];

@NgModule({
  declarations: [
    AppComponent,
    FilmDetailsComponent,
    SearchComponent,
    ListFilmsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: [StatelessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
