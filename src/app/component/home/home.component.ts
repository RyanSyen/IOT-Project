import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { DocumentData, QuerySnapshot } from '@firebase/firestore';
import { FirebaseService } from 'src/app/firebase.service';
import { ChartType, Chart, ChartConfiguration } from 'chart.js';
// import { NgChartsModule, MultiDataSet, Label, Colors } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  toggleProBanner(event: { preventDefault: () => void; }) {
    event.preventDefault();
    document.querySelector('body')!.classList.toggle('removeProbanner');
  }


  public canvas: any;
  public ctx: any;
  public datasets: any;
  public data: any;
  public myChartData: any;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;

  constructor(private firebaseService: FirebaseService) { }



  ngOnInit() {
  }
  // public doughnutChartLabels: Label[] = ["Paypal", "Stripe", "Cash"];
  public doughnutChartLabels: string[] = ["Paypal", "Stripe", "Cash"];
  public doughnutChartData: any = [
    [55, 25, 20]
  ];
  // public doughnutChartColors1: ChartConfiguration<'doughnut'>['']
  public doughnutChartColors: any = [
    {
      backgroundColor: [
        '#111111',
        '#00d25b',
        '#ffab00'
      ]
    }
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartChartPlugins = {
    beforeDraw: function (chart: { chart: { width: any; height: any; ctx: any; }; }) {
      var width = chart.chart.width,
        height = chart.chart.height,
        ctx = chart.chart.ctx;

      ctx.restore();
      var fontSize = 1;
      ctx.font = fontSize + "rem sans-serif";
      ctx.textAlign = 'left';
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";

      var text = "$1200",
        textX = Math.round((width - ctx.measureText(text).width) / 2),
        textY = height / 2.4;

      ctx.fillText(text, textX, textY);

      ctx.restore();
      var fontSize = 0.75;
      ctx.font = fontSize + "rem sans-serif";
      ctx.textAlign = 'left';
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#6c7293";

      var texts = "Total",
        textsX = Math.round((width - ctx.measureText(text).width) / 1.93),
        textsY = height / 1.7;

      ctx.fillText(texts, textsX, textsY);
      ctx.save();
    }
  }
  public doughnutChartOptions: any = {
    responsive: true,
    cutoutPercentage: 70,
    maintainAspectRatio: true,
    segmentShowStroke: false,
    elements: {
      arc: {
        borderWidth: 0
      }
    },
    legend: {
      display: false,
    }
  };

  portfolioCarousel = {
    loop: true,
    dots: false,
    margin: 10,
    items: 1,
    nav: true,
    autoplay: true,
    autoplayTimeout: 5500,
    navText: ["<i class='mdi mdi-chevron-left'></i>", "<i class='mdi mdi-chevron-right'></i>"]
  }

  mapStyle = {
    sources: {
      world: {
        type: "geojson",
        data: "assets/countries.geo.json"
      }
    },
    version: 8,
    layers: [{
      "id": "countries",
      "type": "fill",
      "source": "world",
      "layout": {},
      "paint": {
        'fill-color': '#ffffff'
      }
    }]
  }



}


