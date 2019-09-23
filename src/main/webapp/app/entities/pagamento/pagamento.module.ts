import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConsultorioSharedModule } from 'app/shared/shared.module';
import { PagamentoComponent } from './pagamento.component';
import { PagamentoDetailComponent } from './pagamento-detail.component';
import { PagamentoUpdateComponent } from './pagamento-update.component';
import { PagamentoDeletePopupComponent, PagamentoDeleteDialogComponent } from './pagamento-delete-dialog.component';
import { pagamentoRoute, pagamentoPopupRoute } from './pagamento.route';

const ENTITY_STATES = [...pagamentoRoute, ...pagamentoPopupRoute];

@NgModule({
  imports: [ConsultorioSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PagamentoComponent,
    PagamentoDetailComponent,
    PagamentoUpdateComponent,
    PagamentoDeleteDialogComponent,
    PagamentoDeletePopupComponent
  ],
  entryComponents: [PagamentoDeleteDialogComponent]
})
export class ConsultorioPagamentoModule {}
