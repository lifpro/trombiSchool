import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Etudiant } from '../@common/model/etudiant';
import { EtudiantsService } from '../@common/services/etudiants.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { EtudiantFireBasesService } from '../@common/services/etudiants.firebase.service';
import { Toast } from '@ionic-native/toast/ngx';
import { Network } from '@ionic-native/network/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  statut: number = 0;// 0:Inscription, 1: se loger,2: afficher le profil 
  inscform: FormGroup;
  loginform: FormGroup;
  item: Etudiant = new Etudiant();
  fbcollection: AngularFirestoreCollection;
  itemDoc: AngularFirestoreDocument<Etudiant>
  password: string;
  imagePath: string;
  image = '../assets/img/user.png';
  task: any;
  constructor(
    protected service: EtudiantsService,
    protected serviceFb: EtudiantFireBasesService,
    public asc: ActionSheetController,
    private network: Network,
    private camera: Camera,
    protected fb: FormBuilder,
    public afAuth: AngularFireAuth,
    public afFS: AngularFirestore,
    public afSG: AngularFireStorage,
    public toastController: ToastController,
    // private toast: Toast
  ) {
    if (this.statut == 0) {
      this.item = new Etudiant();
      this.item.nom = "GOITA";
      this.item.prenom = "Assimi";
      this.item.email = "assimi.goita@gmail.com";
      this.password = "123456";
      this.item.cycle = "M";
      this.item.formation = "GL";
      this.item.centre = "Direction";
      this.item.ville = "Bamako";
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
      email: this.fb.control(this.item.email, [Validators.required, Validators.maxLength(50), emailValidator]),
      password: this.fb.control(this.password, [Validators.required]),
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
    });
    this.inscform.get('email').valueChanges.subscribe(value => this.item.email = value.trim());
    this.inscform.get('password').valueChanges.subscribe(value => this.password = value.trim());
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
    this.afAuth.createUserWithEmailAndPassword(this.item.email,
      this.password)
      .then(auth => {
        console.log('ID de l utilisateur: ' + auth.user.uid);
        this.item.id = auth.user.uid;
        this.saveEtudiantInfoToFB();
      })
      .catch(err => {
        console.log('Erreur: ' + err);
        this.errorInscription();
      });

  }
  saveEtudiantInfoToFB() {
    this.task = this.afSG.ref(this.imagePath).putString(this.image, 'data_url');
    this.task.then(res => {
      this.serviceFb.saveDocument(this.item)
        .then(async resp => {
          this.successInscription();
        }).catch(error => {
          console.log(error);
        })
    });
  }
  connecter() {

  }
  updateToFB() {
    this.serviceFb.updateDocument(this.item)
      .then(async resp => {
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
  async addPhoto() {
    const actionSheet = await this.asc.create({
      header: 'Choisir une photo de profil',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Caméra',
        icon: 'camera',
        handler: () => {
          if (this.network.type === 'none') {
            this.errorConnexion();
          } else {
            this.addPhotoFromCamera();
          }
        }
      }, {
        text: 'Galerie',
        icon: 'images',
        handler: () => {

          if (this.network.type === 'none') {
            this.errorConnexion();
          } else {
            this.addPhotoFromGalerie();
          }
        }
      },
      {
        text: 'Annuler',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Annuler');
        }
      }]
    });
    await actionSheet.present();
  }
  async addPhotoFromGalerie() {
    const base64 = await this.captureImageGalerie();
    this.createUploadTask(base64);
  }

  async addPhotoFromCamera() {
    const base64 = await this.captureImageCamera();
    this.createUploadTask(base64);
  }
  createUploadTask(file: string): void {
    this.imagePath = `photo/etud_${new Date().getTime()}.jpg`;
    this.image = 'data:image/jpg;base64,' + file;
  }
  async captureImageGalerie() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    return await this.camera.getPicture(options);
  }

  async captureImageCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    return await this.camera.getPicture(options);
  }

  async errorInscription() {
    const toast = await this.toastController.create({
      message: 'Email incorrect ou mot de passe trop court',
      duration: 2000,
      position: 'bottom',
      color: 'danger',
    });
    toast.present();
  }
  async successInscription() {
    const toast = await this.toastController.create({
      message: 'Profil créé avec succès',
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });
    toast.present();
  }
  async errorConnexion() {
    const toast = await this.toastController.create({
      message: 'Aucune connexion internet.',
      duration: 2000,
      position: 'bottom',
      color: 'danger',
    });
    toast.present();
  }
}

export function emailValidator(control: FormControl): { [key: string]: any } {
  var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
  if (control.value && !emailRegexp.test(control.value)) {
    return { invalidEmail: true };
  }
}