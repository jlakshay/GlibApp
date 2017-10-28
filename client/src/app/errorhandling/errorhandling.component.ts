//----------------------------Importing Modules---------------------------------------------
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import * as config from './config/error.config.json';
//------------------------------------------------------------------------------------------------------

@Component({
  selector: 'app-errorhandling',
  templateUrl: './errorhandling.component.html',
  styleUrls: ['./errorhandling.component.css']
})
//-------------Exporting ErrorhandlingComponent class------------------------------------------------
export class ErrorhandlingComponent implements OnInit {
  public word= (<any>config).errHand;
  
  constructor(private activatedRoute: ActivatedRoute) {}
public error_name :any

  ngOnInit() {

  	this.activatedRoute.params.subscribe((params: Params) => {
        this.error_name = params['id'];
        console.log(this.error_name);
      });
  }


}
