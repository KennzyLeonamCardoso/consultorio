/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ConsultorioTestModule } from '../../../test.module';
import { TercerizadoDetailComponent } from 'app/entities/tercerizado/tercerizado-detail.component';
import { Tercerizado } from 'app/shared/model/tercerizado.model';

describe('Component Tests', () => {
  describe('Tercerizado Management Detail Component', () => {
    let comp: TercerizadoDetailComponent;
    let fixture: ComponentFixture<TercerizadoDetailComponent>;
    const route = ({ data: of({ tercerizado: new Tercerizado(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ConsultorioTestModule],
        declarations: [TercerizadoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TercerizadoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TercerizadoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.tercerizado).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
