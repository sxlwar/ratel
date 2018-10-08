import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopicsComponent } from './topics/topics.component';
import { ArticleComponent } from '../article/article/article.component';
import { TopicContainerComponent } from './topic-container/topic-container.component';

const topicRoutes: Routes = [
    {
        path: '',
        component: TopicContainerComponent,
        children: [{ path: ':topic', component: TopicsComponent }, { path: ':topic/:id', component: ArticleComponent }],
    },
];

@NgModule({
    imports: [RouterModule.forChild(topicRoutes)],
})
export class TopicRoutingModule {}
