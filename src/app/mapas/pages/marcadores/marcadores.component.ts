import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
    .mapa-container {
      width:100%;
      height: 100%;
    }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  // para poder tener multiples instancias de mapas
  // para que no dependan del ID
  @ViewChild('mapa') divMapa!: ElementRef

  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [-70.65436534660041, -33.48892235763639]


  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      //y ahora utilizar el elemento nativo
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola Mundo';

    // Create a new marker.
    new mapboxgl.Marker({
      // element: markerHtml
    })
      .setLngLat(this.center)
      .addTo(this.mapa);

  }


}
