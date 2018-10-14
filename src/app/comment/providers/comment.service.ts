import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Observable, Subscription, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { CRUDVar } from '../../constant/constant';
import {
    CommentRequest,
    DeleteCommentRequest,
    EnjoyCommentRequest,
    GetCommentRequest,
    ReplyRequest,
} from '../../interface/request.interface';
import {
    AddCommentResponse,
    DeleteCommentResponse,
    EnjoyCommentResponse,
    GetCommentResponse,
    UpdateCommentResponse,
} from '../../interface/response.interface';
import { BaseService } from '../../providers/base.service';
import { ErrorService } from '../../providers/error.service';

@Injectable()
export class CommentService extends BaseService {
    private path = 'comment';

    refresh$: Subject<boolean> = new Subject();

    constructor(
        private readonly _http: HttpClient,
        private readonly _error: ErrorService,
        private readonly _snack: MatSnackBar,
    ) {
        super();
    }

    getComments(data: GetCommentRequest): Observable<GetCommentResponse> {
        return this._http
            .get<GetCommentResponse>(this.completeApiUrl(this.path, data.id))
            .pipe(catchError(this._error.handleHttpError));
    }

    createComment(data: CommentRequest): Observable<AddCommentResponse> {
        return this._http
            .post<AddCommentResponse>(this.completeApiUrl(this.path, CRUDVar.CREATE), data)
            .pipe(catchError(this._error.handleHttpError));
    }

    deleteComment(data: DeleteCommentRequest): Observable<DeleteCommentResponse> {
        /**
         * angular 4.3 以上版本的 delete 方法中没有 body 体， 所以使用通用方法，request
         */
        return this._http
            .request('DELETE', this.completeApiUrl(this.path, CRUDVar.DELETE), { body: { data } })
            .pipe(catchError(this._error.handleHttpError));
    }

    enjoyComment(data: EnjoyCommentRequest): Observable<EnjoyCommentResponse> {
        return this._http
            .put<EnjoyCommentResponse>(this.completeApiUrl(this.path, CRUDVar.UPDATE), { data })
            .pipe(catchError(this._error.handleHttpError));
    }

    replyComment(data: ReplyRequest): Observable<UpdateCommentResponse> {
        return this._http
            .post<UpdateCommentResponse>(this.completeApiUrl(this.path, CRUDVar.CREATE), { data })
            .pipe(catchError(this._error.handleHttpError));
    }

    handleOperateCommentResult<T>(resObs: Observable<T>, message: string, callback?: (T) => any): Subscription {
        return resObs.subscribe(res => {
            if (message) {
                this._snack.open(message, '', this.snakeBarConfig);
            }

            if (callback) {
                callback(res);
            }
        });
    }

    /**
     * 通知业务组件刷新评论
     */
    refreshComment = (): void => {
        this.refresh$.next(true);
    }
}
