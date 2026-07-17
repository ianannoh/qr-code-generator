import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circular-progress-indicator-component',
  imports: [

  ],
  templateUrl: './circular-progress-indicator-component.html',
  styleUrls: ['./circular-progress-indicator-component.scss']
})
export class CircularProgressIndicatorComponent {
  @Input() borderColor: string = '';
}
