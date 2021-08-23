import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';
declare var google: any;
@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.page.html',
  styleUrls: ['./localisation.page.scss'],
})

export class LocalisationPage implements OnInit {
  map: any;
  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  infoWindows: any = [];
  markers: any = [];
  constructor(private platform: Platform) {

  }

  ngOnInit() {
    this.markers.push({
      title: 'Sabalibougou',
      tel: '20215678',
      latitude: 12.594745,
      longitude: -8.0097888
    });
    this.markers.push({
      title: 'Direction',
      tel: '202156999',
      latitude: 12.594740,
      longitude: -8.0097888
    });
  }
  ionViewDidEnter() {
    this.showMap();
  }
  showMap() {
    const location = new google.maps.LatLng(12.594745, -8.0097888);

    const options = {
      center: location,
      zoom: 15,
      // disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkersToMap(this.markers);
  }
  addMarkersToMap(markers) {
    for (let marker of markers) {
      let position = new google.maps.LatLng(marker.latitude, marker.longitude);
      let mapMarker = new google.maps.Marker({
        position: position,
        title: marker.title,
        tel: marker.tel,
        latitude: marker.latitude,
        longitude: marker.longitude
      });

      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
    }
  }

  addInfoWindowToMarker(marker) {
    let infoWindowContent = '<div id="content">' +
      '<h2 style="color:blue">' + marker.title + '</h2>' +
      '<p style="color:red">Tél: ' + marker.tel + '</p>' +
      '<p style="color:red">Latitude: ' + marker.latitude + '</p>' +
      '<p style="color:red">Longitude: ' + marker.longitude + '</p>' +
      '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      this.closeAllInfoWindows();
      infoWindow.open(this.map, marker);
    });
    this.infoWindows.push(infoWindow);
  }
  closeAllInfoWindows() {
    for (let window of this.infoWindows) {
      window.close();
    }
  }

}
