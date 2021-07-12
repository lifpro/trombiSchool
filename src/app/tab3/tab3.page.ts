import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Etudiant } from '../@common/model/etudiant';
import { EtudiantsService } from '../@common/services/etudiants.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { EtudiantFireBasesService } from '../@common/services/etudiants.firebase.service';
import { Toast } from '@ionic-native/toast/ngx';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  statut: number = 2;// 0:Inscription, 1: se loger,2: afficher le profil 
  inscform: FormGroup;
  loginform: FormGroup;
  item: Etudiant = new Etudiant();
  fbcollection: AngularFirestoreCollection;
  itemDoc: AngularFirestoreDocument<Etudiant>
  constructor(
    protected service: EtudiantsService,
    protected serviceFb: EtudiantFireBasesService,
    protected fb: FormBuilder,
    public afFS: AngularFirestore,
    public toastController: ToastController,
    // private toast: Toast
  ) {
    if (this.statut == 0) {
      this.item = new Etudiant();
    }
    if (this.statut == 2) {
      this.serviceFb.getDocumentById('E_1625515045539').subscribe(data => {
        this.item = data;
        this.buildInscForm();
        console.log(this.item)
      })
    }

    this.fbcollection = afFS.collection('etudiants')
    this.buildInscForm();

    this.loginform = this.fb.group({
      email: this.fb.control(null, [Validators.required, emailValidator]),
      password: this.fb.control(null, [Validators.required]),
    });
  }
  buildInscForm() {
    this.inscform = this.fb.group({
      cycle: this.fb.control(this.item.cycle, [Validators.required]),
      formation: this.fb.control(this.item.formation, [Validators.required]),
      ville: this.fb.control(this.item.ville, [Validators.required]),
      centre: this.fb.control(this.item.centre, [Validators.required]),
      nom: this.fb.control(this.item.nom, [Validators.required, Validators.maxLength(50)]),
      prenom: this.fb.control(this.item.prenom, [Validators.required, Validators.maxLength(50)]),
    });
    this.subscribeIncs();
  }
  private subscribeIncs(): void {
    this.inscform.get('cycle').valueChanges.subscribe(value => this.item.cycle = value.trim());
    this.inscform.get('formation').valueChanges.subscribe(value => this.item.formation = value.trim());
    this.inscform.get('prenom').valueChanges.subscribe(value => this.item.prenom = value.trim());
    this.inscform.get('ville').valueChanges.subscribe(value => this.item.ville = value.trim());
    this.inscform.get('centre').valueChanges.subscribe(value => this.item.centre = value.trim());
    this.inscform.get('nom').valueChanges.subscribe(value => {
      this.item.nom = value.trim();
      console.log(this.item.nom)
    });
  }


  getItem(id: string) {
    this.itemDoc = this.afFS.doc<Etudiant>(`etudiants/${id}`)
    return this.itemDoc.valueChanges();
  }

  // webservice
  // saveToWS() {
  //   let e: Etudiant = new Etudiant();
  //   e.nom = "DIARRA";
  //   e.prenom = "Myriam";
  //   this.service.save(e).subscribe(data => {
  //     alert('Etudiant enregistrer avec succèss')
  //   });

  //   console.log('Entre dans ma methode save')
  // }
  saveToFB() {
    this.serviceFb.saveDocument(this.item)
      .then(async resp => {
        const toast = await this.toastController.create({
          message: 'Profil créé avec succès',
          duration: 2000,
          position: 'bottom',
          color: 'success',
        });
        toast.present();
      }).catch(error => {
        console.log(error);
      })
  }

  connecter() {

  }
  updateToFB() {
    this.serviceFb.updateDocument(this.item)
      .then(async resp => {
        // this.toast.show(`Profil modifié avec succès`, '5000', 'center').subscribe(
        //   toast => {
        //     console.log(toast);
        //   }
        // );
        const toast = await this.toastController.create({
          message: 'Profil modifié avec succès',
          duration: 2000,
          position: 'bottom',
          color: 'success',
        });
        toast.present();
      }).catch(error => {
        console.log(error);
      })
  }
}

export function emailValidator(control: FormControl): { [key: string]: any } {
  var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidEmail: true };
  }
}