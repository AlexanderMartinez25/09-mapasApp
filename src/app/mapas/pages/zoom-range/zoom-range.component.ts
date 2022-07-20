import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container {
      width:100%;
      height: 100%;
    }

    .row {
      background-color:white;
      bottom: 50px;
      left:50px;
      padding:10px;
      border-radius: 5px;
      position:fixed;
      z-index:999;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit {

  // para poder tener multiples instancias de mapas
  // para que no dependan del ID
  @ViewChild('mapa') divMapa!: ElementRef
  mapa!: mapboxgl.Map;
  zoomLevel: number = 10

  constructor() {
  }

  // para que primero se genere el html y luego tomar la referencia local #mapa
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      //y ahora utilizar el elemento nativo
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-70.65436534660041, -33.48892235763639],
      zoom: this.zoomLevel
    });
  }

  zoomOut() {
    this.mapa.zoomOut();
    this.zoomLevel = this.mapa.getZoom()

  }

  zoomIn() {
    this.mapa.zoomIn();
    this.zoomLevel = this.mapa.getZoom()
  }

}
