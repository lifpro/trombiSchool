import { Component } from '@angular/core';
import { Etudiant } from '../@common/model/etudiant';
import { EtudiantsService } from '../@common/services/etudiants.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(protected service: EtudiantsService) { }
  save() {
    let e: Etudiant = new Etudiant();
    e.nom = "DIARRA";
    e.prenom = "Myriam";
    this.service.save(e).subscribe(data => {
      alert('Etudiant enregistrer avec succèss')
    });

    console.log('Entre dans ma methode save')
  }

}
