/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ConsultorioTestModule } from '../../../test.module';
import { TercerizadoComponent } from 'app/entities/tercerizado/tercerizado.component';
import { TercerizadoService } from 'app/entities/tercerizado/tercerizado.service';
import { Tercerizado } from 'app/shared/model/tercerizado.model';

describe('Component Tests', () => {
  describe('Tercerizado Management Component', () => {
    let comp: TercerizadoComponent;
    let fixture: ComponentFixture<TercerizadoComponent>;
    let service: TercerizadoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConsultorioTestModule],
        declarations: [TercerizadoComponent],
        providers: []
      })
        .overrideTemplate(TercerizadoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TercerizadoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TercerizadoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Tercerizado(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.tercerizados[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
