import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordMatcherDirective } from './password-matcher.directive';
import { MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        PasswordMatcherDirective
    ],
    exports: [
        PasswordMatcherDirective
    ],imports: [
        CommonModule,
        FlexLayoutModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        BrowserAnimationsModule
    ]
})
export class SharedModule { }