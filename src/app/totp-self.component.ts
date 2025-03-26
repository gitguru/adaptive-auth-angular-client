import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocalService } from './service/local-service';

@Component({
  selector: 'totp-self',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './totp-self.component.html',
})
export class TotpSelfComponent {

  constructor(private localService: LocalService) {}

  show() {
    return this.localService.isEmpty("clientId");
  }
}
