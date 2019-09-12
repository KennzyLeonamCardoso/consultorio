import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMedico, Medico } from 'app/shared/model/medico.model';
import { MedicoService } from './medico.service';
import { IFuncionario } from 'app/shared/model/funcionario.model';
import { FuncionarioService } from 'app/entities/funcionario';

@Component({
  selector: 'jhi-medico-update',
  templateUrl: './medico-update.component.html'
})
export class MedicoUpdateComponent implements OnInit {
  isSaving: boolean;

  funcionarios: IFuncionario[];

  editForm = this.fb.group({
    id: [],
    nome: [],
    salario: [],
    funcionario: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected medicoService: MedicoService,
    protected funcionarioService: FuncionarioService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ medico }) => {
      this.updateForm(medico);
    });
    this.funcionarioService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IFuncionario[]>) => mayBeOk.ok),
        map((response: HttpResponse<IFuncionario[]>) => response.body)
      )
      .subscribe((res: IFuncionario[]) => (this.funcionarios = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(medico: IMedico) {
    this.editForm.patchValue({
      id: medico.id,
      nome: medico.nome,
      salario: medico.salario,
      funcionario: medico.funcionario
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const medico = this.createFromForm();
    if (medico.id !== undefined) {
      this.subscribeToSaveResponse(this.medicoService.update(medico));
    } else {
      this.subscribeToSaveResponse(this.medicoService.create(medico));
    }
  }

  private createFromForm(): IMedico {
    return {
      ...new Medico(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      salario: this.editForm.get(['salario']).value,
      funcionario: this.editForm.get(['funcionario']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedico>>) {
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

  trackFuncionarioById(index: number, item: IFuncionario) {
    return item.id;
  }
}
