import { MatSnackBarConfig } from '@angular/material/snack-bar';

import { environment } from '../../environments/environment';

export type SnackbarType = 'info' | 'success' | 'warn' | 'error';

export class BaseService {
    private readonly snakeBarConfig: MatSnackBarConfig = {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: ['snack', 'info-snack'],
    };

    protected completeApiUrl(...paths: string[]): string {
        return environment.apiAddress + '/api/' + paths.join('/');
    }

    public getSnackbarConfig(type?: SnackbarType): MatSnackBarConfig {
        return !!type ? { ...this.snakeBarConfig, panelClass: ['snack', `${type}-snack`] } : this.snakeBarConfig;
    }
}
