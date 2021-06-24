import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sorteio-sindimoto';
  numeros = ['11 973575621', '11 973532621', '11 973534621', '11 976165621', '11 7476175621', '11 916175621', '11 696715621'];


  ngOnInit() {

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
  }
}
