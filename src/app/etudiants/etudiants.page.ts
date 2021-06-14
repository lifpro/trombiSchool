import { Component, OnInit } from '@angular/core';
import { EtudiantsService } from '../@common/services/etudiants.service';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.page.html',
  styleUrls: ['./etudiants.page.scss'],
})
export class EtudiantsPage implements OnInit {
  linkStyle = 'underline';
  etudiants2: any;
  etudiants: { id: number, nom: string, prenom: string, sexe: string, telephone: string, email: string, formation: string, cours: number }[] = [
    { "id": 1, "nom": "diarra", "prenom": "fanta", "sexe": "F", "telephone": "78905467", "email": "diarra@gmail.com", "formation": "Télécom", "cours": 1 },
    { "id": 2, "nom": "sissoko", "prenom": "kadidia", "sexe": "F", "telephone": "78905467", "email": "sissoko@gmail.com", "formation": "Miage", "cours": 0 },
    { "id": 3, "nom": "drame", "prenom": "karouna", "sexe": "M", "telephone": "78905467", "email": "drame@gmail.com", "formation": "Génie logiciel", "cours": 1 }
  ];

  constructor(protected service: EtudiantsService) { }

  ngOnInit() {
    this.loadList();
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
