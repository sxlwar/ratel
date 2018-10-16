import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperateCommentComponent } from './operate-comment.component';

describe('OperateCommentComponent', () => {
    let component: OperateCommentComponent;
    let fixture: ComponentFixture<OperateCommentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OperateCommentComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OperateCommentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
