import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Config } from '../@common/config';
import { EtudRech } from '../@common/model/etud-rech';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  config: Config = new Config();
  dateNaiss: Date = new Date('1990-01-01');
  age = 15;
  myclass: boolean = false;
  mform: EtudRech;
  form: FormGroup;
  link = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Ibrahim_Boubacar_Ke%C3%AFta_par_Claude_Truong-Ngoc_d%C3%A9cembre_2013_%28cropped%29.jpg/330px-Ibrahim_Boubacar_Ke%C3%AFta_par_Claude_Truong-Ngoc_d%C3%A9cembre_2013_%28cropped%29.jpg"
  constructor(private router: Router,
    protected fb: FormBuilder,
  ) {
    this.mform = new EtudRech();
    this.mform.cycle = "D";
    this.mform.ville = "Bamako";

    this.form = this.fb.group({
      cycle: 'D',
      formation: null,
      ville: 'Bamako',
      centre: null,
      nom: this.fb.control(null, [Validators.required]),
    });
    this.subscribe();
  }
  private subscribe(): void {
    this.form.get('cycle').valueChanges.subscribe(value => this.mform.cycle = value.trim());
    this.form.get('formation').valueChanges.subscribe(value => this.mform.formation = value.trim());
    this.form.get('nom').valueChanges.subscribe(value => this.mform.nom = value.trim());
    this.form.get('ville').valueChanges.subscribe(value => this.mform.ville = value.trim());
    this.form.get('centre').valueChanges.subscribe(value => this.mform.centre = value.trim());
  }

  rechercher() {
    let navigationExtras: NavigationExtras = {
      skipLocationChange: false,
      state: {
        dataRec: this.mform,
      }
    };
    this.router.navigate(['/etudiants'], navigationExtras);
  }

}
