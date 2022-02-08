import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { UserChart } from 'src/app/model/usuario-chart';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private usuarioService : UsuarioService) { }

userChart = new UserChart();

  ngOnInit() {
    this.usuarioService.carregarGrafico().subscribe (data => {
      this.userChart = data;

      this.barChartLabels = this.userChart.nome.split(',');

      var arraySalario = JSON.parse('[' + this.userChart.salario + ']');

      this.barChartData = [
        { data: arraySalario, label: 'Salário Usuário' }
      ];
    });
  }

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [
    { data: [], label: 'Salário Usuário' }
  ];

}
