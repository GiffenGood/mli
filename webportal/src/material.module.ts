import * as am from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [BrowserAnimationsModule,
        am.MatButtonModule,
        am.MatCheckboxModule,
        am.MatToolbarModule,
        am.MatExpansionModule,
        am.MatInputModule,
        am.MatGridListModule,
        am.MatSidenavModule,
        am.MatIconModule,
        am.MatPaginatorModule,
        am.MatTableModule
    ],
    exports: [BrowserAnimationsModule,
        am.MatButtonModule,
        am.MatCheckboxModule,
        am.MatToolbarModule,
        am.MatExpansionModule,
        am.MatInputModule,
        am.MatGridListModule,
        am.MatSidenavModule,
        am.MatIconModule,
        am.MatPaginatorModule,
        am.MatTableModule
    ]
})

export class MaterialModule { }
