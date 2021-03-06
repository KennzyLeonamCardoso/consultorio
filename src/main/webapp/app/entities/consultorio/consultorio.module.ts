import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConsultorioSharedModule } from 'app/shared';
import {
  ConsultorioComponent,
  ConsultorioDetailComponent,
  ConsultorioUpdateComponent,
  ConsultorioDeletePopupComponent,
  ConsultorioDeleteDialogComponent,
  consultorioRoute,
  consultorioPopupRoute
} from './';

const ENTITY_STATES = [...consultorioRoute, ...consultorioPopupRoute];

@NgModule({
  imports: [ConsultorioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ConsultorioComponent,
    ConsultorioDetailComponent,
    ConsultorioUpdateComponent,
    ConsultorioDeleteDialogComponent,
    ConsultorioDeletePopupComponent
  ],
  entryComponents: [ConsultorioComponent, ConsultorioUpdateComponent, ConsultorioDeleteDialogComponent, ConsultorioDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultorioConsultorioModule {}
