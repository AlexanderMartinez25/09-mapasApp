import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
      width:400px
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  // para poder tener multiples instancias de mapas
  // para que no dependan del ID
  @ViewChild('mapa') divMapa!: ElementRef

  mapa!: mapboxgl.Map;
  zoomLevel: number = 10;
  center: [number, number] = [-70.65436534660041, -33.48892235763639]

  constructor() {
  }

  // eliminamos los listeners para no consumir memoria al salir del componente
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => { });
    this.mapa.off('zoomend', () => { });
    this.mapa.off('move', () => { });
  }

  // para que primero se genere el html y luego tomar la referencia local #mapa
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      //y ahora utilizar el elemento nativo
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    // capturar el evento zoom
    this.mapa.on('zoom', (ev) => {
      this.zoomLevel = this.mapa.getZoom();
    })

    // capturar el evento zoomend
    // para limitar al mismo
    this.mapa.on('zoomend', (ev) => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
      }
    })

    //movimiento del mapa
    this.mapa.on('move', (ev) => {
      const target = ev.target;
      const { lat, lng } = target.getCenter();

      this.center = [lng, lat]

    })
  }

  zoomOut() {
    this.mapa.zoomOut();
  }

  zoomIn() {
    this.mapa.zoomIn();
  }

  // con el input recibimos el valor del html
  zoomCambio(valor: string) {
    this.mapa.zoomTo(Number(valor))

  }
}
