import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConsultorioSharedModule } from 'app/shared/shared.module';
import { ConsultorioComponent } from './consultorio.component';
import { ConsultorioDetailComponent } from './consultorio-detail.component';
import { ConsultorioUpdateComponent } from './consultorio-update.component';
import { ConsultorioDeletePopupComponent, ConsultorioDeleteDialogComponent } from './consultorio-delete-dialog.component';
import { consultorioRoute, consultorioPopupRoute } from './consultorio.route';

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
  entryComponents: [ConsultorioDeleteDialogComponent]
})
export class ConsultorioConsultorioModule {}
