import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SorteioSindicatoService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  /* create_NewIcecream : Cria um novo registro na coleção especificada usando o método add */
  create_newNumeroSorteado(record) {
    return this.firestore.collection('numeros_sorteados').add(record);
  }
  /*read_Icecream: Chama o método snapshotChanges , que obterá registros e também será registrado para receber atualizações */
  read_numerosSorteados() {
    return this.firestore.collection('numeros_sorteados').snapshotChanges();
  }
  // /*update_Icecream : atualiza o registro pegando o ID e chamando o método de atualização */
  // update_numerosSorteados(recordID,record) {
  //   this.firestore.doc('numeros_sorteados/' + recordID).update(record);
  // }
  // /*delete_Icecream : chama o método de exclusão  ao registrar o ID*/
  // delete_numerosSorteados(record_id) {
  //   this.firestore.doc('numeros_sorteados/' + record_id).delete();
  //   }
}