import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label: string;
  @Output() onClick = new EventEmitter<any>();
  
  onClickButton(event: any) {
      this.onClick.emit(event);
    }
}
