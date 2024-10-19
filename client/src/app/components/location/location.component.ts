// import { Component, OnInit } from '@angular/core';
// import { icon, latLng, Map, marker, routing, tileLayer } from 'leaflet';
// import { LocationService } from '../../services/location.service';
// import 'leaflet-routing-machine';
// @Component({
//   selector: 'app-location',
//   templateUrl: './location.component.html',
//   styleUrls: ['./location.component.css']
// })
// export class LocationComponent implements OnInit {
//   geo: [number, number] = [0, 0]; // Inicializar con coordenadas por defecto
//   map: any;

//   constructor(private locationService: LocationService) {}

//   ngOnInit() {
//     this.locationService.getUserLocation().then((coords) => {
//       this.geo = coords;
//       this.initializeMap();
//     }).catch(error => {
//       console.error('Error obteniendo la localización:', error);
//     });
//   }

//   initializeMap() {
//     this.map = new Map('map').setView(this.geo, 13);
//     tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       maxZoom: 19,
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     }).addTo(this.map);
//   }

//   ubicar() {
//     marker(this.geo).addTo(this.map).bindPopup("<strong>Aqui te ubicas</strong>").openPopup();
//     marker([21.165946121374493, -100.93078675519567]).addTo(this.map).bindPopup("<strong>Aqui puedes encontrarnos</strong>").openPopup();

//     routing.control({
//       waypoints: [
//         latLng(this.geo),
//         latLng([21.165946121374493, -100.93078675519567])
//       ]
//     }).addTo(this.map);
//   }

//   ubicar1() {
//     marker(this.geo).addTo(this.map).bindPopup("<strong>Aqui te ubicas</strong>").openPopup();
//     marker([21.162156625049445, -100.92703135644601]).addTo(this.map).bindPopup("<strong>Psicologo Privado</strong>").openPopup();

//     routing.control({
//       waypoints: [
//         latLng(this.geo),
//         latLng([21.162156625049445, -100.92703135644601])
//       ]

//     }).addTo(this.map);
//   }

//   recargar() {
//     location.reload();
//   }
// }
