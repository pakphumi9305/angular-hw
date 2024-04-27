import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';

@Component({
  selector: 'app-validation-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './validation-error.component.html',
  styleUrl: './validation-error.component.css'
})
export class ValidationErrorComponent {
  @Input() control!:FormControl;
  @Input() messages: { [key: string]: string } = {};
  @Input() submitted: boolean = false;
}
