/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ConsultorioTestModule } from '../../../test.module';
import { TercerizadoDeleteDialogComponent } from 'app/entities/tercerizado/tercerizado-delete-dialog.component';
import { TercerizadoService } from 'app/entities/tercerizado/tercerizado.service';

describe('Component Tests', () => {
  describe('Tercerizado Management Delete Component', () => {
    let comp: TercerizadoDeleteDialogComponent;
    let fixture: ComponentFixture<TercerizadoDeleteDialogComponent>;
    let service: TercerizadoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConsultorioTestModule],
        declarations: [TercerizadoDeleteDialogComponent]
      })
        .overrideTemplate(TercerizadoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TercerizadoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TercerizadoService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
