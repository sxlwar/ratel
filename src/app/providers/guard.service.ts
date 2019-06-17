import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';

import { from, of } from 'rxjs';
import { find, map, mergeMap } from 'rxjs/operators';

import { DeactivateGuard } from '../interface/app.interface';
import { BaseService } from './base.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../tool/confirm/confirm.component';

export interface CanDeactivateComponent {
    canDeactivate(): DeactivateGuard[];
}

export class BaseGuard extends BaseService implements CanDeactivate<CanDeactivateComponent> {
    constructor(public dialog: MatDialog) {
        super();
    }

    canDeactivate(component: CanDeactivateComponent, _route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
        const guards = component.canDeactivate();

        return from(guards).pipe(
            mergeMap(guard =>
                guard.canDeactivate.pipe(map(can => ({ can, message: guard.message, title: guard.title }))),
            ),
            find(guard => !guard.can),
            mergeMap(
                item =>
                    !item
                        ? of(true)
                        : this.dialog
                              .open(ConfirmComponent, { data: { title: item.title, message: item.message } })
                              .afterClosed(),
            ),
        );
    }
}

@Injectable({
    providedIn: 'root'
})
export class ArticleCreateGuard extends BaseGuard {
    constructor(public dialog: MatDialog) {
        super(dialog);
    }
}
