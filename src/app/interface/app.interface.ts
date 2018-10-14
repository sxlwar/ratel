import { Observable } from 'rxjs';

export interface DeactivateGuard {
    canDeactivate: Observable<boolean>;
    message: string;
    title?: string;
}
