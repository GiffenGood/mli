import * as am from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [BrowserAnimationsModule, am.MatButtonModule, am.MatCheckboxModule, am.MatToolbarModule],
    exports: [BrowserAnimationsModule, am.MatButtonModule, am.MatCheckboxModule, am.MatToolbarModule],
})

export class MaterialModule { }
