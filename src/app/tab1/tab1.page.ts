import { Component } from '@angular/core';
import { Config } from '../@common/config';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  config: Config = new Config();
  dateNaiss: Date = new Date();
  age = 15;
  myclass: boolean = false;
  cycle: string = 'D';
  link = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Ibrahim_Boubacar_Ke%C3%AFta_par_Claude_Truong-Ngoc_d%C3%A9cembre_2013_%28cropped%29.jpg/330px-Ibrahim_Boubacar_Ke%C3%AFta_par_Claude_Truong-Ngoc_d%C3%A9cembre_2013_%28cropped%29.jpg"
  constructor() {
    console.log(this.config.pi)
  }

}
