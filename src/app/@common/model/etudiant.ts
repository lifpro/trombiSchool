export class Etudiant {
    id: string;
    nom: string;
    prenom: string;
    sexe: string;
    dateNaiss: Date;
    telephone: string;
    email: string;
    cycle: string;// L:Licence,M:Master,D:DUT
    formation: string;
    cours: boolean;// O: cours du soir, 1: cours du jours
    photo: string;
}
