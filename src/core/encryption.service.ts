import { Injectable } from '@angular/core';
import CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  private readonly key: string = '903d800f60564a45c3f7d7769c80031adefba3834837a80dbb96517fc5195651';

  encrypt(data: unknown): string {

    const json = JSON.stringify(data);

    return CryptoJS.AES
      .encrypt(json, this.key)
      .toString();
  }


  decrypt<T>(encryptedData: string): T {

    const bytes = CryptoJS.AES.decrypt(
      encryptedData,
      this.key
    );

    const decrypted = bytes.toString(
      CryptoJS.enc.Utf8
    );

    return JSON.parse(decrypted);
  }
}
