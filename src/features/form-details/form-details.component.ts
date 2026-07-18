import {Component, OnInit} from '@angular/core';
import {EncryptionService} from '../../core/encryption.service';
import {ActivatedRoute} from '@angular/router';
import {Validators} from '@angular/forms';

interface IData {
  primaryColor: string;
  secondaryColor: string;
  profilePic: string;
  firstName: string;
  lastName: string;
  phones: string;
  emails: string;
  websites: string;
  street: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  region: string;
  country: string;
  company: string;
  profession: string;
  companySummary: string;
}
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


      this.data = this.encryption.decrypt<any>(token);


    });

  }

  protected data!: IData;
}
