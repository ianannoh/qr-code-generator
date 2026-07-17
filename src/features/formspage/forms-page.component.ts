import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  CircularProgressIndicatorComponent
} from '../../shared/circular-progress-indicator-component/circular-progress-indicator-component';

interface IContact {
  id: string;
  label: string;
  data: string;
}
@Component({
  selector: 'app-forms-page',
  imports: [
    FormsModule,
    CircularProgressIndicatorComponent,
    ReactiveFormsModule
  ],
  templateUrl: './forms-page.component.html',
  styleUrl: './forms-page.component.css'
})
export class FormsPageComponent {

  private form = inject(FormBuilder);

  protected qrCodeForm: FormGroup = this.form.group({
    primaryColor: ['#14a0ee', [Validators.required]],
    secondaryColor: ['#0a4363', [Validators.required]],
    profilePic: [null as File | null, Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phoneContacts: this.form.array([])
  });

  protected imagePreview?: string;

  protected onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    this.qrCodeForm.patchValue({
      profilePic: file
    });

    this.imagePreview = URL.createObjectURL(file);

    this.qrCodeForm.get('profilePic')?.markAsDirty();
    this.qrCodeForm.get('profilePic')?.updateValueAndValidity();
  }


  protected selectedCardId: string = '0';
  protected isSubmitting: boolean = false;

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

  protected submitDetails(form: FormGroup): void {
    console.log(form.value);
    console.log(this.phoneContacts);
  }
}
