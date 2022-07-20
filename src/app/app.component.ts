import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from "mapbox-gl";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    // ya que es lo primero que se carga en toda la app 
    // y lo necesitaremos en todos los componentes
    (mapboxgl as any).accessToken = environment.mapboxToken;
  }
}
