import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-professeurs',
  templateUrl: './professeurs.page.html',
  styleUrls: ['./professeurs.page.scss'],
})
export class ProfesseursPage implements OnInit {

  professeurs: { id: number, nom: string, prenom: string, sexe: string, telephone: string, email: string, photo: string }[] = [
    { "id": 1, "nom": "DIARRA", "prenom": "Fanta", "sexe": "F", "telephone": "78905467", "email": "diarra@gmail.com", "photo": "people" },
    { "id": 2, "nom": "SISSOKO", "prenom": "Kadidia", "sexe": "F", "telephone": "78905467", "email": "sissoko@gmail.com", "photo": "search" },
    { "id": 3, "nom": "DRAME", "prenom": "Harouna", "sexe": "M", "telephone": "78905467", "email": "drame@gmail.com", "photo": "people" }
  ];
  constructor() { }

  ngOnInit() {
  }

}
