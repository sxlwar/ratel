import { Directive, OnInit, ViewContainerRef, TemplateRef, Inject, PLATFORM_ID } from '@angular/core';

import { isPlatformServer } from '@angular/common';

@Directive({
    selector: '[ratelShellRender]',
})
export class AppShellRenderDirective implements OnInit {
    constructor(
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        @Inject(PLATFORM_ID) private platformId,
    ) {}

    ngOnInit() {
        if (isPlatformServer(this.platformId)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}

@Directive({
    selector: '[ratelShellNoRender]',
})
export class AppShellNoRenderDirective implements OnInit {
    constructor(
        private viewContainer: ViewContainerRef,
        private templateRef: TemplateRef<any>,
        @Inject(PLATFORM_ID) private platformId,
    ) {}

    ngOnInit() {
        if (isPlatformServer(this.platformId)) {
            this.viewContainer.clear();
        } else {
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }
}
