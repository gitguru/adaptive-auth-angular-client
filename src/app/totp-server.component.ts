import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocalService } from './service/local-service';

@Component({
  selector: 'totp-server',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './totp-server.component.html',
})
export class TotpServerComponent {

  constructor(private localService: LocalService) {}

  show() {
    return this.localService.isEmpty("clientId");
  }
}
