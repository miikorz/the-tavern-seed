import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// modules
const SHARED_COMPONENTS = [
];

const SHARED_MODULES: any[] = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  FormsModule,
  HttpClientModule
];

const PROVIDERS: any[] = [];

/**
 * SharedModule
 * Only for shared components, directives and pipes
 * Do not specify providers here
 * https://angular.io/docs/ts/latest/cookbook/ngmodule-faq.html#!#what-kinds-of-modules-should-i-have-and-how-should-i-use-them-
 */

@NgModule({
  imports: [
    ...SHARED_MODULES,
  ],
  declarations: [
    ...SHARED_COMPONENTS,
  ],
  exports: [
    ...SHARED_MODULES,
    ...SHARED_COMPONENTS,
  ],
  providers: [
    ...PROVIDERS,
  ],
})
export class SharedModule {}
