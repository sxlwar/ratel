export interface CommentTarget {
    commentId: number;
    toUser: string;
    toUserId?: number;
}

export interface EnjoyUpdateInfo {
    commentId: number;
    addCount: number;
}
