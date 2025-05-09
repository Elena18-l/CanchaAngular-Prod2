import { Component, Input, AfterViewInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-pentagon',
  templateUrl: './pentagon.component.html',
  styleUrls: ['./pentagon.component.css']
})
export class PentagonComponent implements AfterViewInit, OnChanges {
  @Input() skills!: { fisico: number; tecnica: number; fuerzaMental: number; resistencia: number; habilidadEspecial: number };

  @ViewChild('pentagonChart', { static: false }) chartRef!: ElementRef<HTMLCanvasElement>;
  private chart!: Chart;
  playerStats: number[] = [0,0,0,0,0];

  ngAfterViewInit() {
    this.updatePlayerStats();
    this.createRadarChart();
    console.log(this.skills, "y yo sigo aqui eseperandoteeee que tu dulce...");
  }
ngOnChanges(changes: SimpleChanges): void {
   if(changes['skills'] && this.skills){ 
      this.updatePlayerStats();
      this.updateChart();
    }
}
private updatePlayerStats() {
  this.playerStats = [
    this.skills.fisico,
    this.skills.tecnica,
    this.skills.fuerzaMental,
    this.skills.resistencia,
    this.skills.habilidadEspecial
  ];
}

createRadarChart() {
  if (!this.chartRef.nativeElement || !this.skills) {
    console.error("Canvas o skills no disponible");
    return;
  }

  const stats = [
    this.skills.fisico,
    this.skills.tecnica,
    this.skills.fuerzaMental,
    this.skills.resistencia,
    this.skills.habilidadEspecial,
  ];

  this.chart = new Chart(this.chartRef.nativeElement, {
    type: 'radar',
    data: {
      labels: [' ', ' ', ' ', ' ', ' '], 
      datasets: [
        {
          label: 'Estadísticas',
          data: stats,  // Ahora stats está correctamente definido
          backgroundColor: 'rgba(255, 165, 0, 0.4)',
          borderColor: '#FF9809',
          borderWidth: 3,
          pointBackgroundColor: 'orange',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          min: 0,
          max: 10,
          ticks: {
            stepSize: 2,
            color: '#ffffff00',
            backdropColor: 'transparent'
           
          },
          grid: {
            color: '#D38A03'
          },
          backgroundColor:'#FFE9BF'
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

  private updateChart() {
    if (this.chart) {
      this.chart.data.datasets[0].data = this.playerStats;
      this.chart.update();
    }
  }

}
