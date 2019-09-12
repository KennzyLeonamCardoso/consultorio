import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITercerizado } from 'app/shared/model/tercerizado.model';
import { TercerizadoService } from './tercerizado.service';

@Component({
  selector: 'jhi-tercerizado-delete-dialog',
  templateUrl: './tercerizado-delete-dialog.component.html'
})
export class TercerizadoDeleteDialogComponent {
  tercerizado: ITercerizado;

  constructor(
    protected tercerizadoService: TercerizadoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tercerizadoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tercerizadoListModification',
        content: 'Deleted an tercerizado'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tercerizado-delete-popup',
  template: ''
})
export class TercerizadoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tercerizado }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TercerizadoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tercerizado = tercerizado;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tercerizado', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tercerizado', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
