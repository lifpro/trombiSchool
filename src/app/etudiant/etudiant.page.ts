import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Etudiant } from '../@common/model/etudiant';

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.page.html',
  styleUrls: ['./etudiant.page.scss'],
})
export class EtudiantPage implements OnInit {
  // etudiants: { id: number, nom: string, prenom: string, sexe: string, telephone: string, email: string, formation: string }[] = [
  //   { "id": 1, "nom": "DIARRA", "prenom": "Fanta", "sexe": "F", "telephone": "78905467", "email": "diarra@gmail.com", "formation": "Télécom" },
  //   { "id": 2, "nom": "SISSOKO", "prenom": "Kadidia", "sexe": "F", "telephone": "78905467", "email": "sissoko@gmail.com", "formation": "Miage" },
  //   { "id": 3, "nom": "DRAME", "prenom": "Harouna", "sexe": "M", "telephone": "78905467", "email": "drame@gmail.com", "formation": "Génie logiciel" }
  // ];
  etudiant: Etudiant;
  constructor(private route: ActivatedRoute, private router: Router,
    private callService: CallNumber) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.etudiant = this.router.getCurrentNavigation().extras.state.item;
      }
    });
  }

  // getEtudiantById(id) {
  //    return this.etudiants.find(function (etudiant) {
  //     return etudiant.id == parseInt(id);
  //   });
  // }
  call() {
    this.callService.callNumber(this.etudiant.telephone, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }
  localiser() {
    let navigationExtras: NavigationExtras = {
      skipLocationChange: false,
      state: {
        item: this.etudiant,
      }
    };
    this.router.navigate(['/map'], navigationExtras);
  }
}
