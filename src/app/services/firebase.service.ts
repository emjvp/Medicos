import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/toPromise';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
 
  constructor(public afs: AngularFirestore, private snapshotChangesSubscription: any) {
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child('image').child('imageName');
   
  }
  createFriend(value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('Doctors').doc(currentUser.uid)
      .collection('friends').add({
        id: value.id
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
    }
    createClinicalC(value){
      return new Promise<any>((resolve, reject) => {
        let currentUser = firebase.auth().currentUser;
        this.afs.collection('Doctors').doc(currentUser.uid)
        .collection('clinicalc').add({
          title: value.title,
          description: value.description,
          image: value.image,
          document: value.document
        })
        .then(
          res => resolve(res),
          err => reject(err)
        )
      })
  }
  createDocumentAuth(value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('Doctors').doc(currentUser.uid)
      .collection('document_auth').add({
        image: value.image,
        document: value.document
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  }
  uploadImage(imageURI, randomId){
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child(randomId);
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          snapshot.ref.getDownloadURL()
          .then(res => resolve(res))
        }, err => {
          reject(err);
        })
      })
    })
  }
  createDocument(value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('Doctors').doc(currentUser.uid)
      .collection('documents').add({
        image: value.image,
        document: value.document
      })
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
  getFriends(){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.snapshotChangesSubscription = 
      this.afs.collection('Doctors').doc(currentUser.uid)
      .collection('friends').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }
  getClinicalC(){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.snapshotChangesSubscription = 
      this.afs.collection('Doctors').doc(currentUser.uid)
      .collection('friends').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }
  getDocumentAuth(){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.snapshotChangesSubscription = 
      this.afs.collection('Doctors').doc(currentUser.uid)
      .collection('document_auth').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }
  getDocuments(){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.snapshotChangesSubscription = 
      this.afs.collection('Doctors').doc(currentUser.uid)
      .collection('documents').snapshotChanges()
      .subscribe(snapshots => {
        resolve(snapshots);
      })
    });
  }
  updateClinicalC(clinicalcKey, value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('Doctors').doc(currentUser.uid)
      .collection('clinicalc').doc(clinicalcKey).set(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
  updateDocumentAuth(document_authKey, value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('Doctors').doc(currentUser.uid)
      .collection('document_auth').doc(document_authKey).set(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
  updateDocument(document_authKey, value){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('Doctors').doc(currentUser.uid)
      .collection('document').doc(document_authKey).set(value)
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
  deleteClinicalC(clinicalcKey){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('Doctors').doc(currentUser.uid)
      .collection('clinicalc').doc(clinicalcKey).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
  deleteDocumentAuth(document_authKey){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('Doctors').doc(currentUser.uid)
      .collection('document_auth').doc(document_authKey).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
  deleteDocument(document_Key){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('Doctors').doc(currentUser.uid)
      .collection('documents').doc(document_Key).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
  deleteFriend(friendKey){
    return new Promise<any>((resolve, reject) => {
      let currentUser = firebase.auth().currentUser;
      this.afs.collection('Doctors').doc(currentUser.uid)
      .collection('friends').doc(friendKey).delete()
      .then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }
}

