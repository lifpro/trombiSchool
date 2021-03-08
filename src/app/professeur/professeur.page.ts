import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
interface Professeur {
  id: number;
  nom: string;
  prenom: string;
  sexe: string;
  telephone: string;
  email: string;
  photo: string;
}
@Component({
  selector: 'app-professeur',
  templateUrl: './professeur.page.html',
  styleUrls: ['./professeur.page.scss'],
})
export class ProfesseurPage implements OnInit {
  professeurs: { id: number, nom: string, prenom: string, sexe: string, telephone: string, email: string, photo: string }[] = [
    { "id": 1, "nom": "DIARRA", "prenom": "Fanta", "sexe": "F", "telephone": "78905467", "email": "diarra@gmail.com", "photo": "people" },
    { "id": 2, "nom": "SISSOKO", "prenom": "Kadidia", "sexe": "F", "telephone": "78905467", "email": "sissoko@gmail.com", "photo": "search" },
    { "id": 3, "nom": "DRAME", "prenom": "Harouna", "sexe": "M", "telephone": "78905467", "email": "drame@gmail.com", "photo": "people" }
  ];
  professeur: Professeur;
  constructor(private route: ActivatedRoute) {
    this.professeur = {
      id: 0,
      nom: '',
      prenom: '',
      sexe: '',
      telephone: '',
      email: '',
      photo: ''
    };
  }

  ngOnInit() {
    // On récupère l'identifiant de la
    let etudId = this.route.snapshot.paramMap.get('id');
    console.log(etudId)
    this.professeur = this.getProfesseurById(etudId);
  }
  /**
   ** Renvoie un etudiant en fonction de son identifiant
   ** @param id : identifiant de l'étudiant
   **/
  getProfesseurById(id) {
    // La méthode find va rerchercher le premier dont l'identifiant est égal à id
    return this.professeurs.find(function (professeur) {
      return professeur.id == parseInt(id);
    });
  }

}
