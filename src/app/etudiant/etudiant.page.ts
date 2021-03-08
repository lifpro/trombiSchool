import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Etudiant {
  id: number;
  nom: string;
  prenom: string;
  sexe: string;
  telephone: string;
  email: string;
  formation: string;
}

@Component({
  selector: 'app-etudiant',
  templateUrl: './etudiant.page.html',
  styleUrls: ['./etudiant.page.scss'],
})
export class EtudiantPage implements OnInit {
  etudiants: { id: number, nom: string, prenom: string, sexe: string, telephone: string, email: string, formation: string }[] = [
    { "id": 1, "nom": "DIARRA", "prenom": "Fanta", "sexe": "F", "telephone": "78905467", "email": "diarra@gmail.com", "formation": "Télécom" },
    { "id": 2, "nom": "SISSOKO", "prenom": "Kadidia", "sexe": "F", "telephone": "78905467", "email": "sissoko@gmail.com", "formation": "Miage" },
    { "id": 3, "nom": "DRAME", "prenom": "Harouna", "sexe": "M", "telephone": "78905467", "email": "drame@gmail.com", "formation": "Génie logiciel" }
  ];
  etudiant: Etudiant;
  constructor(private route: ActivatedRoute) {
    this.etudiant = {
      id: 0,
      nom: '',
      prenom: '',
      sexe: '',
      telephone: '',
      email: '',
      formation: ''
    };
  }

  ngOnInit() {
    // On récupère l'identifiant de la
    let etudId = this.route.snapshot.paramMap.get('id');
    console.log(etudId)
    this.etudiant = this.getEtudiantById(etudId);
  }
  /**
   ** Renvoie un etudiant en fonction de son identifiant
   ** @param id : identifiant de l'étudiant
   **/
  getEtudiantById(id) {
    // La méthode find va rerchercher le premier dont l'identifiant est égal à id
    return this.etudiants.find(function (etudiant) {
      return etudiant.id == parseInt(id);
    });
  }
}
