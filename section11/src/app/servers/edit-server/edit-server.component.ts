import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CanComponentDeactivate } from './can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number, name: string, status: string };
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService,
    private activateRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // console.log('query params' + this.activateRouter.snapshot.queryParams)
    this.activateRouter.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
    });
    // console.log('fragment' + this.activateRouter.snapshot.fragment)
    this.activateRouter.fragment.subscribe();

    const id = +this.activateRouter.snapshot.params['id'];
    this.updateServer(id);
    this.activateRouter.params.subscribe((params: Params) => {
      this.updateServer(+params['id']);
    })
  }

  updateServer(id: number) {
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
    this.changesSaved = true;
    this.router.navigate(['../'], { relativeTo: this.activateRouter })
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.allowEdit && (this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard changes?')
    } else return true;
  }
}
