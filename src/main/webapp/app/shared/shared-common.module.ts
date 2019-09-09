import { NgModule } from '@angular/core';

import { ConsultorioSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
  imports: [ConsultorioSharedLibsModule],
  declarations: [JhiAlertComponent, JhiAlertErrorComponent],
  exports: [ConsultorioSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class ConsultorioSharedCommonModule {}
