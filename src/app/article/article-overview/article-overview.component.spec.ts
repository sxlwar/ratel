import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleOverviewComponent } from './article-overview.component';

describe('ArticleOverviewComponent', () => {
    let component: ArticleOverviewComponent;
    let fixture: ComponentFixture<ArticleOverviewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ArticleOverviewComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArticleOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
