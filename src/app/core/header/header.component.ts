import { Component, EventEmitter, Output } from '@angular/core';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent {
    // @Output() featureSelected = new EventEmitter<string>();

    // OnSelect(feature: string) {
    //     this.featureSelected.emit(feature);
    // }

    constructor(private ds: DataStorageService, private as: AuthService) {}

    onSaveData() {
        this.ds.storedata();
    }

    onFetchData() {
        this.ds.getRecipes();
    }

    onLogout() {
        this.as.logout();
    }

    isAuthenticated() {
        return this.as.isAuthenticated();
      }
    
}