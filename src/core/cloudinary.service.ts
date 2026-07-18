import { Injectable } from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {


  private cloudName = 'dvqgao0sn';
  private uploadPreset = 'qr_code_gen';


  constructor(
    private http: HttpClient
  ){}


  async uploadImage(file: File): Promise<string> {

    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    const url = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;

    const response: any = await firstValueFrom(this.http.post(url, formData));

    return response.secure_url;
  }
}
