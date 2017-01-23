// angular
import { NgModule, Optional, SkipSelf, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// app
import { GO_COMPONENTS } from './components/index';
// import { GO_PROVIDERS } from './services/index';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
  ],
  declarations: [
    GO_COMPONENTS
  ],
  providers: [
    // SAMPLE_PROVIDERS
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    GO_COMPONENTS,
  ]
})
export class GoModule {

  constructor(@Optional() @SkipSelf() parentModule: GoModule) {
    if (parentModule) {
      throw new Error('GoModule already loaded; Import in root module only.');
    }
  }
}
