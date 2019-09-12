import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Tercerizado } from 'app/shared/model/tercerizado.model';
import { TercerizadoService } from './tercerizado.service';
import { TercerizadoComponent } from './tercerizado.component';
import { TercerizadoDetailComponent } from './tercerizado-detail.component';
import { TercerizadoUpdateComponent } from './tercerizado-update.component';
import { TercerizadoDeletePopupComponent } from './tercerizado-delete-dialog.component';
import { ITercerizado } from 'app/shared/model/tercerizado.model';

@Injectable({ providedIn: 'root' })
export class TercerizadoResolve implements Resolve<ITercerizado> {
  constructor(private service: TercerizadoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITercerizado> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Tercerizado>) => response.ok),
        map((tercerizado: HttpResponse<Tercerizado>) => tercerizado.body)
      );
    }
    return of(new Tercerizado());
  }
}

export const tercerizadoRoute: Routes = [
  {
    path: '',
    component: TercerizadoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tercerizados'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TercerizadoDetailComponent,
    resolve: {
      tercerizado: TercerizadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tercerizados'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TercerizadoUpdateComponent,
    resolve: {
      tercerizado: TercerizadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tercerizados'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TercerizadoUpdateComponent,
    resolve: {
      tercerizado: TercerizadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tercerizados'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tercerizadoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TercerizadoDeletePopupComponent,
    resolve: {
      tercerizado: TercerizadoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tercerizados'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
