import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITercerizado } from 'app/shared/model/tercerizado.model';
import { AccountService } from 'app/core';
import { TercerizadoService } from './tercerizado.service';

@Component({
  selector: 'jhi-tercerizado',
  templateUrl: './tercerizado.component.html'
})
export class TercerizadoComponent implements OnInit, OnDestroy {
  tercerizados: ITercerizado[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tercerizadoService: TercerizadoService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tercerizadoService
      .query()
      .pipe(
        filter((res: HttpResponse<ITercerizado[]>) => res.ok),
        map((res: HttpResponse<ITercerizado[]>) => res.body)
      )
      .subscribe(
        (res: ITercerizado[]) => {
          this.tercerizados = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTercerizados();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITercerizado) {
    return item.id;
  }

  registerChangeInTercerizados() {
    this.eventSubscriber = this.eventManager.subscribe('tercerizadoListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
