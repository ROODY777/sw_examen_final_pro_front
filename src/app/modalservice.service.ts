import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalserviceService {

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
