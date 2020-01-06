import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() selectedElement = new EventEmitter<string>();
  onSelected(element: string) {
    this.selectedElement.emit(element);
  }
}
