// angular
import { NgModule, Optional, SkipSelf, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

// app
import { KIFUGO_COMPONENTS } from './components/index';
import { ButtonModule,MessagesModule,DataTableModule,SharedModule} from 'primeng/primeng';
import { KIFUGO_PROVIDERS } from './services/index';
import { KifuEffects,BoardEffects } from './index';
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
    ButtonModule,
    DataTableModule,
    SharedModule,
    EffectsModule.run(KifuEffects),
    EffectsModule.run(BoardEffects)
  ],
  declarations: [
    KIFUGO_COMPONENTS
  ],
  providers: [
    KIFUGO_PROVIDERS
  ],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    KIFUGO_COMPONENTS,
  ]
})
export class KifuGoModule {
  constructor(@Optional() @SkipSelf() parentModule: KifuGoModule) {
    if (parentModule) {
      throw new Error('KifuGoModule already loaded; Import in root module only.');
    }
  }
}
