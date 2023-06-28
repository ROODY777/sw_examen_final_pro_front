import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";

@Injectable({
    providedIn: 'root'
  })
  
  export class ModalService {

    constructor(){}
modal: boolean = false;
private _notificarUpload = new EventEmitter<any>();

get notificarUpload(): EventEmitter<any>{
  return this._notificarUpload;
}


abrirModal(){

    this.modal = true;
}

cerrarModal(){

    this.modal = false;
}









  }