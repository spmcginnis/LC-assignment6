import { Component } from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'orbit-report';
  sourceList: Satellite[];
  displayList: Satellite[];

  constructor() {
    this.sourceList = [];
    let satelittesURL = 'https://handlers.education.launchcode.org/static/satellites.json';

    window.fetch(satelittesURL).then( function(response){
      response.json().then( function(data) {

        let fetchedSat = data.satellites;

        for ( let i=0; i<fetchedSat.length; i++) {
          let fsi = fetchedSat[i]
          let satObj: Satellite = new Satellite(fsi.name, fsi.type, fsi.launchDate, fsi.orbitType, fsi.operational);
          this.sourceList.push(satObj)
        }
        this.displayList = this.sourceList.slice(0);
      }.bind(this) )
    }.bind(this) )
  }

  // search(searchTerm:string): void {
  //   let matchingSatellites: Satellite[] = [];
  //   searchTerm = searchTerm.toLowerCase();
  //   for(let i=0; i<this.sourceList.length; i++) {
  //     let name = this.sourceList[i].name.toLowerCase();
  //     if (name.indexOf(searchTerm) >= 0) {
  //       matchingSatellites.push(this.sourceList[i])
  //     }
  //   }
  //   this.displayList = matchingSatellites;

  // }
}
