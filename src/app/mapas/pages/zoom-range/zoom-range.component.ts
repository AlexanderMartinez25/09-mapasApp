import { Component, OnInit } from '@angular/core';
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
      border-radius: 5px
      position:fixed;
      z-index:999;
    }
    `
  ]
})
export class ZoomRangeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-70.65436534660041, -33.48892235763639],
      zoom: 16
    });
  }

}
