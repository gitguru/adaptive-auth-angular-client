import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocalService } from './service/local-service';

@Component({
    selector: 'client-key',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './client-key.component.html',
})
export class ClientKeyComponent {
    public clientIdForm: FormGroup;
    isSet: boolean = false;

    constructor(private fb: FormBuilder, private localService: LocalService) {
        this.clientIdForm = fb.group({
            clientId: ""
        });
        const data = localService.getData('clientId');
        if (data) {
            this.clientIdForm.patchValue({
                clientId: data
            });            
        }
    }

    ngOnInit() {
        this.isSet = this.localService.isEmpty("clientId") !== true;
    }

    save() {
        this.localService.saveData('clientId', this.clientIdForm.get('clientId')?.value || "");
        this.isSet = this.localService.isEmpty("clientId") !== true;
    }

}
