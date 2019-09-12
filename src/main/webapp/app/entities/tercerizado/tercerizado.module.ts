import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConsultorioSharedModule } from 'app/shared';
import {
  TercerizadoComponent,
  TercerizadoDetailComponent,
  TercerizadoUpdateComponent,
  TercerizadoDeletePopupComponent,
  TercerizadoDeleteDialogComponent,
  tercerizadoRoute,
  tercerizadoPopupRoute
} from './';

const ENTITY_STATES = [...tercerizadoRoute, ...tercerizadoPopupRoute];

@NgModule({
  imports: [ConsultorioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TercerizadoComponent,
    TercerizadoDetailComponent,
    TercerizadoUpdateComponent,
    TercerizadoDeleteDialogComponent,
    TercerizadoDeletePopupComponent
  ],
  entryComponents: [TercerizadoComponent, TercerizadoUpdateComponent, TercerizadoDeleteDialogComponent, TercerizadoDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultorioTercerizadoModule {}
