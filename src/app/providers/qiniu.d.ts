interface Qiniu {
    upload: (file: any, key: string, token: string, putExtra: Qiniu.PutExtra, config: Qiniu.Config) => Qiniu.Observable;
}

declare namespace Qiniu {
    interface Subscription {
        unsubscribe: () => void;
    }

    interface Observable {
        subscribe: (observer: Qiniu.Observer) => Qiniu.Subscription;
    }

    interface Progress {
        loaded: number;
        size: number;
        percent: number;
    }

    interface Total {
        total: Progress;
    }

    interface Error {
        isRequestError: true | undefined;
        reqId: string;
        message: string;
        code: number;
    }

    interface Response {
        hash: string;
        key: string;
    }

    interface Observer {
        next: (res: Qiniu.Total) => void;
        error: (err: Qiniu.Error) => void;
        complete: (res: Qiniu.Response) => void;
    }

    interface Config {
        useCdnDomain?: boolean; // default: false;
        disableStatisticsReport?: boolean; // default: false;
        uphost?: string; // host region;
        retryCount?: number; // default: 3;
        concurrentRequestLimit?: number; // default: 3;
        checkByMD5?: boolean; // default: false;
    }

    interface PutExtra {
        fname?: string; // file name;
        params?: object; // custom variable;
        mimeType?: any[];
    }
}

export = Qiniu;

export as namespace Qiniu;
