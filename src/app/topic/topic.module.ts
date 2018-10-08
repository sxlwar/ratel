import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { TopicsComponent } from './topics/topics.component';
import { ArticleModule } from '../article/article.module';
import { TopicOverviewComponent } from './topic-overview/topic-overview.component';
import { TopicRoutingModule } from './topic.routing.module';
import { TopicContainerComponent } from './topic-container/topic-container.component';

@NgModule({
    imports: [CommonModule, RouterModule, SharedModule, ArticleModule, TopicRoutingModule],
    declarations: [TopicsComponent, TopicOverviewComponent, TopicContainerComponent],
})
export class TopicModule {}
