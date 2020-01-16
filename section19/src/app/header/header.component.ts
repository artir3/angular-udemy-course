import { Component, Output, EventEmitter } from '@angular/core';
import { DatabaseService } from '../shared/database.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private databaseService: DatabaseService) {}

  onSaveData() {
    this.databaseService.storeRecipes();
  }

  onFetechData() {
    this.databaseService.fetechRecipes();
  }
}
