import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'consultorio',
        loadChildren: () => import('./consultorio/consultorio.module').then(m => m.ConsultorioConsultorioModule)
      },
      {
        path: 'pessoa',
        loadChildren: () => import('./pessoa/pessoa.module').then(m => m.ConsultorioPessoaModule)
      },
      {
        path: 'consulta',
        loadChildren: () => import('./consulta/consulta.module').then(m => m.ConsultorioConsultaModule)
      },
      {
        path: 'funcionario',
        loadChildren: () => import('./funcionario/funcionario.module').then(m => m.ConsultorioFuncionarioModule)
      },
      {
        path: 'medico',
        loadChildren: () => import('./medico/medico.module').then(m => m.ConsultorioMedicoModule)
      },
      {
        path: 'tercerizado',
        loadChildren: () => import('./tercerizado/tercerizado.module').then(m => m.ConsultorioTercerizadoModule)
      },
      {
        path: 'pagamento',
        loadChildren: () => import('./pagamento/pagamento.module').then(m => m.ConsultorioPagamentoModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ConsultorioEntityModule {}
