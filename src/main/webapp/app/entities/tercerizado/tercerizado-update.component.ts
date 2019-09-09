import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITercerizado, Tercerizado } from 'app/shared/model/tercerizado.model';
import { TercerizadoService } from './tercerizado.service';

@Component({
  selector: 'jhi-tercerizado-update',
  templateUrl: './tercerizado-update.component.html'
})
export class TercerizadoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nome: [],
    salario: []
  });

  constructor(protected tercerizadoService: TercerizadoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tercerizado }) => {
      this.updateForm(tercerizado);
    });
  }

  updateForm(tercerizado: ITercerizado) {
    this.editForm.patchValue({
      id: tercerizado.id,
      nome: tercerizado.nome,
      salario: tercerizado.salario
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tercerizado = this.createFromForm();
    if (tercerizado.id !== undefined) {
      this.subscribeToSaveResponse(this.tercerizadoService.update(tercerizado));
    } else {
      this.subscribeToSaveResponse(this.tercerizadoService.create(tercerizado));
    }
  }

  private createFromForm(): ITercerizado {
    return {
      ...new Tercerizado(),
      id: this.editForm.get(['id']).value,
      nome: this.editForm.get(['nome']).value,
      salario: this.editForm.get(['salario']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITercerizado>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
