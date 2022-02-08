import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { UserReport } from 'src/app/model/usuario-report';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './usuario-report.component.html',
  styleUrls: ['./usuario-report.component.css']
})
export class UsuarioReportComponent  {

  userReport = new UserReport();

  constructor(private routeActive: ActivatedRoute, private userService: UsuarioService) { }

  imprimeRelatorio() {
    this.userService.downloadPdfRelatorioParam(this.userReport);
  }
}
