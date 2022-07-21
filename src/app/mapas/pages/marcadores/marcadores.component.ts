import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from "mapbox-gl";

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
    .mapa-container {
      width:100%;
      height: 100%;
    }
    .list-group{
      position:fixed;
      top:20px;
      right:20px;
      z-index:99;
    }
    li {
      cursor:pointer;
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

  //Arreglo de marcadores 
  marcadores: MarcadorColor[] = [];

  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      //y ahora utilizar el elemento nativo
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.leerLocalStorage();

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola Mundo';

    // Create a new marker.
    // new mapboxgl.Marker()
    //   .setLngLat(this.center)
    //   .addTo(this.mapa);

  }

  agregarMarcador() {
    // generar codigo hex para el color
    const color = "#xxxxxx".replace(/x/g, y => (Math.random() * 16 | 0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat(this.center)
      .addTo(this.mapa);

    this.marcadores.push({
      color,
      marker: nuevoMarcador
    });

    this.guardarMarcadoresLocalStorage()

    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLocalStorage()
    })
  }

  irMarcador(marker: any) {
    this.mapa.flyTo({
      center: marker.getLngLat(),
      essential: true
    })
  }

  guardarMarcadoresLocalStorage() {

    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach(m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push({
        color,
        centro: [lng, lat]
      });
    });
    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));

  }


  leerLocalStorage() {
    if (!localStorage.getItem('marcadores')) { return; }

    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!)

    lngLatArr.forEach(m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
        .setLngLat(m.centro!)
        .addTo(this.mapa);

      this.marcadores.push({
        marker: newMarker,
        color: m.color
      })

      // al mover el marcador se guarda la posición
      newMarker.on('dragend', () => {
        this.guardarMarcadoresLocalStorage()
      })
    });

  }

  borrarMarcador(i: number) {
    this.marcadores[i].marker?.remove();
    this.marcadores.splice(i, 1)
    this.guardarMarcadoresLocalStorage();
  }

}
