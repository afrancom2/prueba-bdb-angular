import { Component, OnInit } from '@angular/core';
import { Location } from '../services/location';
import { LocationService } from '../services/location.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
})
export class LocationComponent implements OnInit {
  locations: Location[];

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.locationService.getLocations().subscribe((locations) => {
      this.locations = locations;
    });
  }

  delete(location: Location): void {
    swal
      .fire({
        title: '¿Está seguro?',
        text: `¿Seguro que desea eliminar la location ${location.name}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
      })
      .then((result) => {
        if (result.value) {
          this.locationService.delete(location.id).subscribe((response) => {
            this.locations = this.locations.filter((loc) => loc !== location);
            swal.fire(
              'Location eliminada!',
              `Location ${location.name} eliminada con éxito`,
              'success'
            );
          });
        }
      });
  }
}
