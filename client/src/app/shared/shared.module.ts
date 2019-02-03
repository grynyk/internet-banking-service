import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './click-outside.directive';
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
        ClickOutsideDirective,
        PasswordMatcherDirective
    ],
    exports: [
        ClickOutsideDirective,
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