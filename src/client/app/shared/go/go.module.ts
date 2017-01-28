// angular
import { NgModule, Optional, SkipSelf, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// app
import { GO_COMPONENTS } from './components/index';
import { SlideMenuModule, ButtonModule,DataGridModule,MessagesModule} from 'primeng/primeng';
import { GO_PROVIDERS } from './services/index';
import { DirectoryEffects,BoardEffects } from './index';
import { EffectsModule } from '@ngrx/effects';

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    MessagesModule,
    SlideMenuModule,
    ButtonModule,
    DataGridModule,
    EffectsModule.run(DirectoryEffects),
    EffectsModule.run(BoardEffects)
  ],
  declarations: [
    GO_COMPONENTS
  ],
  providers: [
    GO_PROVIDERS
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
