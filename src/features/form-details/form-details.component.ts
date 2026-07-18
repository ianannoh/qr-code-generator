import {Component, OnInit} from '@angular/core';
import {EncryptionService} from '../../core/encryption.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-form-details',
  imports: [],
  templateUrl: './form-details.component.html',
  styleUrl: './form-details.component.css'
})
export class FormDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private encryption: EncryptionService
  ){}


  ngOnInit(){

    this.route.queryParamMap.subscribe(params => {

      const token = params.get('data');

      if(!token) return;


      const data = this.encryption.decrypt<any>(token);


      console.log(data);

    });

  }
}
