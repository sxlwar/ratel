import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicContainerComponent } from './topic-container.component';

describe('TopicContainerComponent', () => {
    let component: TopicContainerComponent;
    let fixture: ComponentFixture<TopicContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TopicContainerComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TopicContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
