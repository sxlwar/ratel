import { environment } from '../../environments/environment';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

export class BaseService {
    protected readonly apiUrl: string = environment.url;

    protected readonly envName: string = environment.name;

    protected readonly isProd: boolean = environment.production;

    protected readonly snakeBarConfig: MatSnackBarConfig = {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 3000,
    };

    protected completeApiUrl(...paths: string[]): string {
        return this.apiUrl + '/' + paths.join('/');
    }
}
