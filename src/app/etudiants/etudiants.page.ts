import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.page.html',
  styleUrls: ['./etudiants.page.scss'],
})
export class EtudiantsPage implements OnInit {
  etudiants: { id: number, nom: string, prenom: string, sexe: string, telephone: string, email: string, formation: string }[] = [
    { "id": 1, "nom": "DIARRA", "prenom": "Fanta", "sexe": "F", "telephone": "78905467", "email": "diarra@gmail.com", "formation": "Télécom" },
    { "id": 2, "nom": "SISSOKO", "prenom": "Kadidia", "sexe": "F", "telephone": "78905467", "email": "sissoko@gmail.com", "formation": "Miage" },
    { "id": 3, "nom": "DRAME", "prenom": "Harouna", "sexe": "M", "telephone": "78905467", "email": "drame@gmail.com", "formation": "Génie logiciel" }
  ];
  constructor() { }

  ngOnInit() {
  }

}
