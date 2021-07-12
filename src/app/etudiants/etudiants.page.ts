import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EtudRech } from '../@common/model/etud-rech';
import { Etudiant } from '../@common/model/etudiant';
import { EtudiantFireBasesService } from '../@common/services/etudiants.firebase.service';
import { EtudiantsService } from '../@common/services/etudiants.service';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.page.html',
  styleUrls: ['./etudiants.page.scss'],
})
export class EtudiantsPage implements OnInit {
  linkStyle = 'underline';
  etudiants2: Etudiant[] = [];
  etudiants: { id: number, nom: string, prenom: string, sexe: string, telephone: string, email: string, formation: string, cours: number }[] = [
    { "id": 1, "nom": "diarra", "prenom": "fanta", "sexe": "F", "telephone": "78905467", "email": "diarra@gmail.com", "formation": "Télécom", "cours": 1 },
    { "id": 2, "nom": "sissoko", "prenom": "kadidia", "sexe": "F", "telephone": "78905467", "email": "sissoko@gmail.com", "formation": "Miage", "cours": 0 },
    { "id": 3, "nom": "drame", "prenom": "karouna", "sexe": "M", "telephone": "78905467", "email": "drame@gmail.com", "formation": "Génie logiciel", "cours": 1 }
  ];
  mform: EtudRech;
  constructor(private router: Router,
    private route: ActivatedRoute,
    protected service: EtudiantsService,
    protected serviceFb: EtudiantFireBasesService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.mform = this.router.getCurrentNavigation().extras.state.dataRec;
        this.loadListFB();
      }
    });

  }
  loadListFB() {
    this.serviceFb.findDocuments(this.mform.cycle, this.mform.formation).subscribe(data => {
      let list = this.getDatas(data);
      this.etudiants2 = list;
      if (this.mform.nom) {
        this.etudiants2 = list.filter((f) => { f.nom === this.mform.nom })
      }
      console.log(this.etudiants2)
    });
  }
  loadList() {
    this.service.findAll().subscribe(data => {
      this.etudiants2 = this.getDatas(data);
      console.log(this.etudiants2)
    });
  }
  delete(id: number) {
    this.service.delete(id).subscribe(data => {
      this.loadList();
    });
  }

  public getDatas(data): any[] | any {
    return data !== null && data.hasOwnProperty('content') ? data.content : data;
  }

}
