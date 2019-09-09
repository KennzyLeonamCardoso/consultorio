import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITercerizado } from 'app/shared/model/tercerizado.model';

@Component({
  selector: 'jhi-tercerizado-detail',
  templateUrl: './tercerizado-detail.component.html'
})
export class TercerizadoDetailComponent implements OnInit {
  tercerizado: ITercerizado;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tercerizado }) => {
      this.tercerizado = tercerizado;
    });
  }

  previousState() {
    window.history.back();
  }
}
