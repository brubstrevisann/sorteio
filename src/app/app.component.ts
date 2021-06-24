import { Component } from '@angular/core';
import { SorteioSindicatoService } from './services/sorteio-sindicato.service'
import { HttpErrorResponse } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public loadingTemplate: TemplateRef<any>;

  loading = false;
  showSorteados: boolean = false;
  showListaNumeros: boolean = false;
  numerosSorteados = [];
  title = 'sorteio-sindimoto';
  numeros = ['11 973575621', '11 973532621', '11 973534621', '11 976165621', '11 7476175621', '11 916175621', '11 696715621'];
  constructor(private service: SorteioSindicatoService) { }


  ngOnInit() {
    this.getNumerosSorteados();
  }




  criarSorteados() {
    // record['numero'] = "11 973575621"
    // record.numero.push("teste");

    // this.service.create_newNumeroSorteado(record).then(resp => {
    //   this.showListaNumeros = false;

    //   this.showSorteados = true;
    //   console.log(resp);
    // // })
    //   .catch(error => {
    //     console.log(error);
    //   });
  }

  getNumerosSorteados() {
    this.service.read_numerosSorteados().subscribe(data => {
      this.numerosSorteados = data.map(e => {
        return {
          numero: e.payload.doc.data()['e']
        };
      })
      if (this.numerosSorteados.length) {
        this.togleLoading();
        this.showListaNumeros = false;

        this.showSorteados = true;
      } else {

        this.togleLoading();

        this.showSorteados = false;

        this.showListaNumeros = true;
      }
      console.log(this.numerosSorteados);
    });
    this.togleLoading();
  }

  togleLoading() {
    this.loading = !this.loading;
  }

  sortear() {
    var currentIndex = this.numeros.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [this.numeros[currentIndex], this.numeros[randomIndex]] = [
        this.numeros[randomIndex],
        this.numeros[currentIndex],
      ];
    }
    this.numeros.slice(0, 1).map(e => {
      this.service.create_newNumeroSorteado({ e })
    })



    // this.showSorteados = true;

    // this.showListaNumeros = false;


  }
}
