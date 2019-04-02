import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleManageComponent } from './article-manage.component';

describe('ArticleManageComponent', () => {
    let component: ArticleManageComponent;
    let fixture: ComponentFixture<ArticleManageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ArticleManageComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArticleManageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
