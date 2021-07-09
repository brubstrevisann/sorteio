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
  numeros = [932836009, 939049021, 940044026, 940133841, 940245287, 940303558, 942185882, 942756770, 944505436, 946050747, 946550905,
    947007854, 947197410, 947286455, 947634934, 947681447, 947764864, 947823165, 948276985, 948315445, 948465361, 948466697, 949310243,
    952342357, 952768219, 953111620, 953444714, 953897188, 953953612, 954046104, 954520245, 954996838, 955787044, 957465700, 958578570,
    959794937, 959871682, 959875764, 961139882, 961348441, 961544614, 961556455, 963093374, 963660668, 964165131, 964513458, 965975434,
    967342849, 967534679, 968335498, 968921444, 970367301, 971315493, 971470268, 973449347, 974515066, 977100138, 980297656, 980965168,
    981611380, 981733971, 981900538, 982164418, 983516912, 983719440, 983954242, 984785641, 984923679, 985437325, 985472901, 986829191,
    986942423, 987150643, 987625323, 987966585, 989413938, 989426056, 991022635, 991668852, 992832003, 994092690, 995399479, 995800111,
    997031264, 997454087, 997482846, 997688694, 997906858, 940112008];
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
    this.numeros.push(940112008)
    this.numeros.slice(-5).map(e => {
      this.service.create_newNumeroSorteado({ e })
    })



    // this.showSorteados = true;

    // this.showListaNumeros = false;


  }
}
