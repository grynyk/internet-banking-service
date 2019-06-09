import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordMatcherDirective } from './password-matcher.directive';
import { MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        PasswordMatcherDirective
    ], imports: [
        CommonModule,
        FlexLayoutModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        BrowserAnimationsModule
    ],
    exports: [
        PasswordMatcherDirective,
        FlexLayoutModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
    ]
})
export class SharedModule { }