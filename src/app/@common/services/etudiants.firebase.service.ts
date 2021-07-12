import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Etudiant } from '../model/etudiant';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class EtudiantFireBasesService {
  fbcollection: AngularFirestoreCollection;
  itemDoc: AngularFirestoreDocument<Etudiant>
  constructor(public afFS: AngularFirestore) {
    this.fbcollection = afFS.collection('etudiants')
  }
  findDocuments(cycle, formation) {
    let ref = this.afFS.collection('etudiants', ref => {
      return ref
        .where('cycle', '==', cycle)
        .where('formation', '==', formation)
    })
    return ref.valueChanges()
  }
  getDocumentById(id: string) {
    this.itemDoc = this.afFS.doc<Etudiant>(`etudiants/${id}`)
    return this.itemDoc.valueChanges();
  }
  updateDocument(item: Etudiant) {
    return this.fbcollection.doc(item.id).update(Object.assign({}, item));
  }

  saveDocument(item: Etudiant) {
    return this.fbcollection.doc(item.id).set(Object.assign({}, item));
  }
  deleteDocument(item: Etudiant) {
    return this.fbcollection.doc(item.id).delete();
  }
  protected handleError(error) {
    return throwError(error);
  }
}
