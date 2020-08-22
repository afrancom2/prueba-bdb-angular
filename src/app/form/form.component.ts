import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '../services/location';

import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public location: Location = new Location();
  public titulo: string = 'Crear Location';

  constructor(
    private locationService: LocationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.cargarLocation();
  }

  cargarLocation(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.locationService
          .getLocation(id)
          .subscribe((location) => (this.location = location));
      }
    });
  }

  public create(): void {
    this.locationService.create(this.location).subscribe((location) => {
      this.router.navigate(['/locations']);
      swal.fire(
        'Nueva Location',
        `La location ${location.name} ha sido creado con éxito`,
        'success'
      );
    });
  }

  update(): void {
    this.locationService.update(this.location).subscribe((json) => {
      this.router.navigate(['/locations']);
      swal.fire(
        'Location Actualizado',
        `${json.mensaje}: ${json.location.name}`,
        'success'
      );
    });
  }
}
