import { OnInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, Router, ActivatedRoute, Params } from '@angular/router';
import { DemoServerApiService } from './service/demo-server-api-service';
import { TotpService } from './service/totp-service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'timestamp',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './timestamp.component.html',
})
export class TimestampComponent implements OnInit {
  totpType: string = '';
  error: boolean = false;
  timestampData: any = {};
  errorData: any = {};
  statusData: any = {};

  constructor(private route: ActivatedRoute, private demoServerApiService: DemoServerApiService, private totpService: TotpService) { }

  ngOnInit() {
    this.totpType = this.route.snapshot.queryParams["type"];
    this.error = false;
    this.timestampData = {};
    this.errorData = {};
    this.statusData = {};
    this.getTimestamp();
  }

  /**
   * Get or generate a Totp token. Depends on the strategy (self, server)
   * @param transactionId - Current adaptive transaction id
   * @returns 
   */
  async getToptp(transactionId: string) {
    // return this.totpService.getTotpToken(this.totpType);
    if (this.totpType === 'self') {
      return await this.totpService.getSelfTotpToken().then((resp: any) => { return resp.otp; });
    } else { // this.totpType === 'server'
      try {
        const serverTotp = await firstValueFrom(this.totpService.getServerTotpToken(transactionId));
        if (serverTotp && serverTotp.status === 200) {
          return serverTotp.body.totp;
        } else {
          this.error = true;
          this.statusData = `${serverTotp.status} ${serverTotp.statusText}`;
          return null;
        }

      } catch (e: any) {
        this.error = true;
        this.statusData = `${e.status} ${e.statusText}`;
        this.errorData = e.error;
        return null;
      }
    }
  }

  /**
   * Resolves a Totp challege when Adaptive Auth Server challenges the Api Client
   * @param transactionId - Current adaptive transaction id
   */
  async resolveTotpChallenge(transactionId: string): Promise<void> {
    const totp = await this.getToptp(transactionId);

    // after getting a Totp token, it is validated
    if (totp) {
      this.demoServerApiService.validateClientTotp(transactionId, totp)
        .subscribe({
          next: resp => {
            console.log('TOTP token validated succesfully');
            return this.getTimestamp();
          },
          error: resp => {
            this.error = true;
            this.statusData = `${resp.status} ${resp.statusText}`;
            this.errorData = resp.error;
          }
        })
    }
  }

  /**
   * Get timestamp from Api Server
   */
  getTimestamp() {
    this.demoServerApiService.getTimestamp()
      .subscribe({
        next: response => { this.timestampData = response.body.timestamp; },
        error: async error => {
          const status = error.status;
          if (status === 401) {
            // we need transactionId to generate and validte Totp token challenges
            const transactionId = await error.error.transaction_id;
            return this.resolveTotpChallenge(transactionId);
          } else {
            this.error = true;
            this.statusData = `${error.status} ${error.statusText}`;
            this.errorData = error.error;
          }
        },
        complete: () => { console.info('Done!'); }
      });
  }


}
