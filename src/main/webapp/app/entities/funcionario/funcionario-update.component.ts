import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IFuncionario, Funcionario } from 'app/shared/model/funcionario.model';
import { FuncionarioService } from './funcionario.service';
import { ITercerizado } from 'app/shared/model/tercerizado.model';
import { TercerizadoService } from 'app/entities/tercerizado';

@Component({
  selector: 'jhi-funcionario-update',
  templateUrl: './funcionario-update.component.html'
})
export class FuncionarioUpdateComponent implements OnInit {
  isSaving: boolean;

  tercerizados: ITercerizado[];

  editForm = this.fb.group({
    id: [],
    numeroRegistro: [],
    tercerizado: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected funcionarioService: FuncionarioService,
    protected tercerizadoService: TercerizadoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ funcionario }) => {
      this.updateForm(funcionario);
    });
    this.tercerizadoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITercerizado[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITercerizado[]>) => response.body)
      )
      .subscribe((res: ITercerizado[]) => (this.tercerizados = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(funcionario: IFuncionario) {
    this.editForm.patchValue({
      id: funcionario.id,
      numeroRegistro: funcionario.numeroRegistro,
      tercerizado: funcionario.tercerizado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const funcionario = this.createFromForm();
    if (funcionario.id !== undefined) {
      this.subscribeToSaveResponse(this.funcionarioService.update(funcionario));
    } else {
      this.subscribeToSaveResponse(this.funcionarioService.create(funcionario));
    }
  }

  private createFromForm(): IFuncionario {
    return {
      ...new Funcionario(),
      id: this.editForm.get(['id']).value,
      numeroRegistro: this.editForm.get(['numeroRegistro']).value,
      tercerizado: this.editForm.get(['tercerizado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFuncionario>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackTercerizadoById(index: number, item: ITercerizado) {
    return item.id;
  }
}
