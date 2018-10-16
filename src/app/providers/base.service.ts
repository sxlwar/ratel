import { MatSnackBarConfig } from '@angular/material/snack-bar';

import { environment } from '../../environments/environment';

export class BaseService {
    protected readonly apiUrl: string = environment.url;

    protected readonly envName: string = environment.name;

    protected readonly isProd: boolean = environment.production;

    private readonly apiPrefix = 'api';

    readonly snakeBarConfig: MatSnackBarConfig = {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
        panelClass: 'global-snack',
    };

    protected completeApiUrl(...paths: string[]): string {
        return this.apiUrl + '/' + this.apiPrefix + '/' + paths.join('/');
    }
}
