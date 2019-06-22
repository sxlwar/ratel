import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';

import { throttle } from 'lodash';

@Component({
    selector: 'ratel-progress',
    templateUrl: './progress.component.html',
    styleUrls: ['./progress.component.scss'],
})
export class ProgressComponent implements OnInit, OnDestroy {
    isBrowser = false;

    progress = 0;

    remove: () => void;

    constructor(@Inject(PLATFORM_ID) _platformId: Object, private elementRef: ElementRef<any>) {
        this.isBrowser = isPlatformBrowser(_platformId);
    }

    ngOnInit() {
        if (this.isBrowser) {
            this.remove = this.listen();
        }
    }

    private listen(): () => void {
        const cal = () => {
            const winHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            const max = docHeight - winHeight;
            return window.scrollY / max;
        };

        this.progress = cal();

        const listener = throttle(() => {
            this.progress = cal();
        }, 200);

        document.addEventListener('scroll', listener);

        return () => document.removeEventListener('scroll', listener);
    }

    ngOnDestroy(): void {
        this.remove && this.remove();
    }
}
