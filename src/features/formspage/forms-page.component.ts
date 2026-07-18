import {Component, inject} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  CircularProgressIndicatorComponent
} from '../../shared/circular-progress-indicator-component/circular-progress-indicator-component';
import {EncryptionService} from '../../core/encryption.service';
import {Router} from '@angular/router';
import {CloudinaryService} from '../../core/cloudinary.service';


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

  constructor(
    private router: Router,
    private encryption: EncryptionService,
    private cloudinary: CloudinaryService,
  ){}


  private form = inject(FormBuilder);

  protected qrCodeForm: FormGroup = this.form.group({
    primaryColor: ['#14a0ee', [Validators.required]],
    secondaryColor: ['#0a4363', [Validators.required]],
    profilePic: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    phones: this.form.array([this.createContact()]),
    emails: this.form.array([this.createContact()]),
    websites: this.form.array([this.createContact()]),
    street: ['', Validators.required],
    streetNumber: ['', Validators.required],
    postalCode: ['', Validators.required],
    city: ['', Validators.required],
    region: ['', Validators.required],
    country: ['', Validators.required],
    company: ['', Validators.required],
    profession: ['', Validators.required],
    companySummary: ['', Validators.required]
  });

  protected imagePreview?: string;

  protected async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    // this.imagePreview = URL.createObjectURL(file);

    const url = await this.cloudinary.uploadImage(file);

    this.imagePreview = url;

    this.qrCodeForm.patchValue({ profilePic: url });
    this.qrCodeForm.get('profilePic')?.markAsDirty();
    this.qrCodeForm.get('profilePic')?.updateValueAndValidity();
  }


  protected selectedCardId: string = '0';
  protected isSubmitting: boolean = false;

  protected setSelectedCardId(value: string): void {
    if (this.selectedCardId === value) {
      this.selectedCardId = '0';
    } else {
      this.selectedCardId = value;
    }
  }

  private createContact(): FormGroup {
    return this.form.nonNullable.group({
      id: crypto.randomUUID(),
      label: '',
      data: ''
    });
  }

  protected get phones(): FormArray<FormGroup> {
    return this.qrCodeForm.get('phones') as FormArray<FormGroup>;
  }

  protected get emails(): FormArray<FormGroup> {
    return this.qrCodeForm.get('emails') as FormArray<FormGroup>;
  }

  protected get websites(): FormArray<FormGroup> {
    return this.qrCodeForm.get('websites') as FormArray<FormGroup>;
  }

  protected addContact(array: FormArray): void {
    array.push(this.createContact());
  }

  protected deleteContact(array: FormArray, index: number): void {
    console.log( index);

    if (array.length === 1) {
      return;
    }

    array.removeAt(index);

    console.log(array.value)

  }

  protected submitDetails(form: FormGroup): void {
    this.isSubmitting = true;

    if (form.invalid) {
      this.isSubmitting = false;
      alert('Fill all required fields')
      return
    }

    const encrypted = this.encryption.encrypt(form.value);


    this.router.navigate(['/form-details'], {
      queryParams:{
        data: encrypted
      }
    });

    this.isSubmitting = false;

  }
}
