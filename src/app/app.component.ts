import { Component, ElementRef, Renderer2 } from '@angular/core';
import { SorteioSindicatoService } from './services/sorteio-sindicato.service'
import { HttpErrorResponse } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { TemplateRef } from '@angular/core';
import * as confetti from 'canvas-confetti';
import * as moment from 'moment-timezone';
import { Subscription, timer } from 'rxjs';

// import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public loadingTemplate: TemplateRef<any>;
  duration = 30 * 1000;
  subscription: Subscription;
  loading = false;
  timeLeft: number = 60;
  interval;
  showSorteados: boolean = false;
  showListaNumeros: boolean = false;
  numerosSorteados = [];
  title = 'sorteio-sindimoto';
  numeros = [11973575621, 11973532621, 11973534621, 11976165621, 117476175621, 11916175621, 11696715621];
  constructor(private service: SorteioSindicatoService,
    private renderer2: Renderer2,
    private elementRef: ElementRef) { }


  ngOnInit() {
    this.getNumerosSorteados();

  }



  public surprise(): void {

    const canvas = this.renderer2.createElement('canvas');
    // canvas.appendTo(document.body);
    this.renderer2.insertBefore(document.body, canvas, document.body.firstChild);

    // var myCanvas = document.createElement('canvas');
    // document.appendChild(myCanvas);
    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true
    });

    // (function frame() {
    //   // launch a few confetti from the left edge
    //   myConfetti({
    //     particleCount: 7,
    //     angle: 60,
    //     spread: 55,
    //     origin: { x: 0 }
    //   });
    //   // and launch a few from the right edge
    //   myConfetti({
    //     particleCount: 7,
    //     angle: 120,
    //     spread: 55,
    //     origin: { x: 1 }
    //   });

    //   // keep going until we are out of time
    //   if (Date.now() < this.end) {
    //     requestAnimationFrame(frame);
    //   }
    // }());
    const source = timer(500, 1000);
    this.subscription = source.subscribe(val => {
      // do stuff you want when the interval ticks
      this.timeLeft--
      myConfetti({
        particleCount: 100,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: Math.random(),
          // since they fall down, start a bit higher than random
          y: Math.random() - 0.2
        }
      });
      if (this.timeLeft == 0) {
        this.subscription.unsubscribe();
        // this.renderer2.removeChild(document.body, document.body.firstChild)
      }

    });
    // while (this.timeLeft > 0) {

    // }
    // setTimeout(() => {

    // }, 7000);




    // setTimeout(() => {
    //   // myConfetti.reset();
    //   this.renderer2.removeChild(document.body, document.body.firstChild)
    // }, 4000);


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
        this.surprise();
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
    this.numeros.slice(0, 5).map(e => {
      this.service.create_newNumeroSorteado({ e })
    })



    // this.showSorteados = true;

    // this.showListaNumeros = false;


  }
}
