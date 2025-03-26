import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ClientKeyComponent } from './client-key.component';
import { TotpSelfComponent } from './totp-self.component';
import { TotpServerComponent } from './totp-server.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, RouterOutlet, ClientKeyComponent, TotpSelfComponent, TotpServerComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
}
