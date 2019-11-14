import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  @Output('bpCreated') blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
  // newServerName = '';
  newServerContent = '';

  constructor() { }

  ngOnInit() { }

  onAddServer(nameInput) {
   this.serverCreated.emit({
     serverContent: this.newServerContent,
     serverName: nameInput.value
   })
  }

  onAddBlueprint(nameInput) {
    this.blueprintCreated.emit({
      serverContent: this.newServerContent,
      serverName: nameInput.value
    })
  }
}
