import {Component, OnInit} from '@angular/core';
import {EncryptionService} from '../../core/encryption.service';
import {ActivatedRoute, Router} from '@angular/router';

interface IContact {
  id: string;
  label: string;
  data: string;
}

interface IData {
  primaryColor: string;
  secondaryColor: string;
  profilePic: string;
  firstName: string;
  lastName: string;
  phones: IContact[];
  emails: IContact[];
  websites: IContact[];
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
    private encryption: EncryptionService,
    private router: Router,
  ) {
  }

  ngOnInit() {

    this.route.queryParamMap.subscribe(params => {

      const token = params.get('data');

      if (!token) {
        this.router.navigate(['/forms']);
        return
      }

      this.data = this.encryption.decrypt<any>(decodeURIComponent(token));
      this.linearGradient = `linear-gradient(to bottom, ${this.data.primaryColor}, ${this.data.secondaryColor})`;
    });

  }


  protected data!: IData;
  protected linearGradient?: string;
  // @ViewChild('sectionOne') sectionOne!: ElementRef<HTMLElement>;
  //
  //
  // protected setBgColor(): void {
  //   const el = this.sectionOne.nativeElement;
  //   el.style.background = this.linearGradient ?? 'linear-gradient(to bottom, rgb(20 160 238 / 0.5), #fff)';
  // }

  protected getInitials(name: string): string {
    const names = name.trim().split(' ');

    if (names.length === 1) {
      return names[0][0].toUpperCase();
    }

    const firstInitial = names[0][0];
    const lastInitial = names[names.length - 1][0];

    return (firstInitial + lastInitial).toUpperCase();
  }

  protected capitalizeWords(value: string | null | undefined): string {
    if (!value?.trim()) return '';

    return value
      .trim()
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  protected downloadContact(contact: IData): void {

    const phones = contact.phones
      .map(phone => `TEL;TYPE=${phone.label.toUpperCase()}:${phone.data}`)
      .join('\n');

    const emails = contact.emails
      .map(phone => `TEL;TYPE=${phone.label.toUpperCase()}:${phone.data}`)
      .join('\n');


    const vcard = `
      BEGIN:VCARD
      VERSION:3.0
      FN:${contact.firstName ?? ''} ${contact.lastName ?? ''}
      ORG:${contact.company ?? ''}
      TITLE:${contact.profession ?? ''}
      ${phones}
      ${emails}
      END:VCARD
      `.trim();

    const blob = new Blob([vcard], {
      type: 'text/vcard;charset=utf-8'
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');

    a.href = url;
    a.download = `${contact.firstName}_${contact.lastName}.vcf`;

    a.click();

    URL.revokeObjectURL(url);
  }
}
