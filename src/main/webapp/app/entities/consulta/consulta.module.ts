import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConsultorioSharedModule } from 'app/shared';
import {
  ConsultaComponent,
  ConsultaDetailComponent,
  ConsultaUpdateComponent,
  ConsultaDeletePopupComponent,
  ConsultaDeleteDialogComponent,
  consultaRoute,
  consultaPopupRoute
} from './';

const ENTITY_STATES = [...consultaRoute, ...consultaPopupRoute];

@NgModule({
  imports: [ConsultorioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ConsultaComponent,
    ConsultaDetailComponent,
    ConsultaUpdateComponent,
    ConsultaDeleteDialogComponent,
    ConsultaDeletePopupComponent
  ],
  entryComponents: [ConsultaComponent, ConsultaUpdateComponent, ConsultaDeleteDialogComponent, ConsultaDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultorioConsultaModule {}
