import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'intro',
  templateUrl: './intro.html',
  styleUrls: [ './intro.css' ]
})
export class Intro {
  constructor(public router: Router) {}
}
