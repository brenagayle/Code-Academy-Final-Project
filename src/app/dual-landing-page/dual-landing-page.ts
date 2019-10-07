import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'dual-landing-page',
  templateUrl: './dual-landing-page.component.html',
  styleUrls: ['./dual-landing-page.scss']
})
export class DualLandingPageComponent implements OnInit {

  constructor(private router: Router) { }


  ngOnInit() {
  }
}
