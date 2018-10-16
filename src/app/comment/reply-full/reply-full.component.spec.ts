import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplyFullComponent } from './reply-full.component';

describe('ReplyFullComponent', () => {
    let component: ReplyFullComponent;
    let fixture: ComponentFixture<ReplyFullComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReplyFullComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReplyFullComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
