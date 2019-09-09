import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ConsultorioSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [ConsultorioSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [ConsultorioSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultorioSharedModule {
  static forRoot() {
    return {
      ngModule: ConsultorioSharedModule
    };
  }
}
