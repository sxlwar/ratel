import { environment } from '../../environments/environment';

export class BaseService {
    protected readonly apiUrl: string = environment.url;

    protected readonly envName: string = environment.name;

    protected readonly isProd: boolean = environment.production;

    protected completeApiUrl(...paths: string[]): string {
        return this.apiUrl + '/' + paths.join('/');
    }
}
