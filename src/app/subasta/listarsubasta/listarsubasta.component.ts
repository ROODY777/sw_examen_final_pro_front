import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DeudorService } from '../../deudor/registrardeudor/deudor.service';
import { AuthService } from 'src/app/services/AuthService.service';
import { Subasta } from '../subasta';
import { SubastaService } from '../subasta.service';
import { ModalService } from '../../cuentabancaria/modal.service';

@Component({
  selector: 'app-listarsubasta',
  templateUrl: './listarsubasta.component.html',
  styleUrls: ['./listarsubasta.component.css']
})
export class ListarsubastaComponent implements OnInit{
/* 

  deudor: Subasta[] = [];
  errores: string[];




  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private deudorService: SubastaService,
    private activateRoute: ActivatedRoute,
    private authService: AuthService
  ) { }





  ngOnInit(): void {
    debugger;
    // ROODY COMENTE
        this.deudorService.getTodossubasta()
         .subscribe(
           response => this.deudor = response
         );
  } */









  subasta: Subasta[] = [];
  errores: string[];

  //subasta: Subasta[] = [];


  subastaSeleccionada : Subasta;

  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private deudorService: SubastaService,
    private activateRoute: ActivatedRoute,
    private authService: AuthService,
    private modalService : ModalService
  ) { }


  ngOnInit(): void {
    debugger;
    // ROODY COMENTE
        this.deudorService.getTodossubasta()
         .subscribe(
           response => this.subasta = response
         );
  }


  abrirModal(cuenta : Subasta){
    debugger
    this.subastaSeleccionada = cuenta;
    this.modalService.abrirModal();
  }




}
