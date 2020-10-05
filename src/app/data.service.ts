import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  Category(): Observable<any>  {
    const encodedURI  = encodeURI('https://opentdb.com/api_category.php');
    return this.http.get(encodedURI);
  }

  MainUrl(id, diffifult): Observable<any>  {
    const encodedURI  = encodeURI('https://opentdb.com/api.php?amount=10&category=' + id +'&difficulty=' + diffifult);
    return this.http.get(encodedURI);
  }

}
