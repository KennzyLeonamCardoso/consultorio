/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ConsultorioTestModule } from '../../../test.module';
import { TercerizadoUpdateComponent } from 'app/entities/tercerizado/tercerizado-update.component';
import { TercerizadoService } from 'app/entities/tercerizado/tercerizado.service';
import { Tercerizado } from 'app/shared/model/tercerizado.model';

describe('Component Tests', () => {
  describe('Tercerizado Management Update Component', () => {
    let comp: TercerizadoUpdateComponent;
    let fixture: ComponentFixture<TercerizadoUpdateComponent>;
    let service: TercerizadoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConsultorioTestModule],
        declarations: [TercerizadoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TercerizadoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TercerizadoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TercerizadoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Tercerizado(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Tercerizado();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
