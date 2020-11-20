import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Router } from '@angular/router';
import { Investigacioin, Cliente, Tramite } from 'src/app/models/modelos';
import { TramiteService, InvestigacionService, PdfService } from './../../services/services'
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { AlertService } from './../../services/alert/alert.service';

@Component({
  selector: 'app-investigacion',
  templateUrl: './investigacion.component.html',
  styleUrls: ['./investigacion.component.css']
})
export class InvestigacionComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  listaInvest:Investigacioin[] = []
  listaTramites:Tramite[] = []
  constructor(
    private tramiteService: TramiteService,
    private router: Router,
    private investigacionService:InvestigacionService,
    private pdfService: PdfService ){ }

  ngOnInit(): void {
    this.getlistTramites()
  }

  getlistTramites(){
    this.blockUI.start("Cargando Datos");
    this.tramiteService.getTramites().subscribe(
      res => {
        this.listaTramites = res;
        this.fiillist()
      }
    );
  }

  ModificarCrearNuevoTrabajo(id:number){
    this.router.navigate([`mantinvestigacion/${id}`]);
  }

  fiillist(){
    this.blockUI.start("Cargando Datos");
    this.investigacionService.getinvestigacioines().subscribe(
      res => {
        this.listaInvest = res;
        this.blockUI.stop();
        console.log(this.listaInvest)
      }
    );
  }

  DeleteTrabajo(investid){
    this.investigacionService.deleteinvestigacioin(investid);
  }

  generarPDF(id: string) {
    this.blockUI.start("Generando Datos");
    this.investigacionService.getinvestigacioinById(id).subscribe(
      res => {
        console.log(1);
        this.pdfService.generatePDF(res).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          }
        );
      });
  }
  // getTotal(){
  //   for (let inves of this.listaInvest) {
  //     for (let i of inves.tramites) {
  //       inves.Total += i.costo 
  //     }
  //     console.log(inves) 
  //   }
  // }

}
