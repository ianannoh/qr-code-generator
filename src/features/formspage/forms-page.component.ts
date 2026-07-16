import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

interface IContact {
  id: string;
  label: string;
  data: string;
}
@Component({
  selector: 'app-forms-page',
  imports: [
    FormsModule
  ],
  templateUrl: './forms-page.component.html',
  styleUrl: './forms-page.component.css'
})
export class FormsPageComponent {
  protected selectedCardId: string = '0';
  protected primaryColor: string = '#14a0ee';
  protected secondaryColor: string = '#0a4363';

  protected phoneContacts: IContact[] = [{
    id: crypto.randomUUID(),
    label: '',
    data: '',
  }];

  protected emailContacts: IContact[] = [{
    id: crypto.randomUUID(),
    label: '',
    data: '',
  }];

  protected websites: IContact[] = [{
    id: crypto.randomUUID(),
    label: '',
    data: '',
  }];

  protected setSelectedCardId(value: string): void {
    if (this.selectedCardId === value) {
      this.selectedCardId = '0';
    } else {
      this.selectedCardId = value;
    }
  }

  protected addContact(des: IContact[]): void {
    des.push({
      id: crypto.randomUUID(),
      label: '',
      data: '',
    })
  }

  protected deleteContact(des: IContact[], id: string): void {
    if (des.length === 1) return;
    des.splice(Number(id), 1);
  }
}
