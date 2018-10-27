import { MatSnackBarConfig } from '@angular/material/snack-bar';

import { environment } from '../../environments/environment';

export class BaseService {
    readonly snakeBarConfig: MatSnackBarConfig = {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: 'global-snack',
    };

    protected completeApiUrl(...paths: string[]): string {
        return environment.domain + '/api/' + paths.join('/');
    }
}
