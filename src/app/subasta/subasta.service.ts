import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { Subasta } from './subasta';


@Injectable({
    providedIn: 'root'
  })
  
  export class SubastaService {
  
  
    private apiURL = environment.apiURL + 'subasta';
    private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
  
    //private urlEndPoint: string = 'http://localhost:8081/cuenta';
  
    constructor(private http: HttpClient, private router: Router) {
  
    }




      getTodossubasta(): Observable<Subasta[]> {
        return this.http.get(this.apiURL + '/subastaListar').pipe(
          map(response => response as Subasta[])
        );
      }

























}