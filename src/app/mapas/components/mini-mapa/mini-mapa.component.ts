import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styles: [
    `
      div{
        width: 100%;
        height: 150px;
        margin: 0px
      }
    `
  ]
})
export class MiniMapaComponent implements AfterViewInit {

  // para recibir parametros del padre
  @Input() lngLat: [number, number] = [0, 0]
  // para seleccionar elemnto por referencia
  @ViewChild('mapa') divMapa!: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {

    const mapa = new mapboxgl.Map({
      //y ahora utilizar el elemento nativo
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.lngLat,
      zoom: 15,
      interactive: false
    });

    new mapboxgl.Marker()
      .setLngLat(this.lngLat)
      .addTo(mapa)

  }
}
