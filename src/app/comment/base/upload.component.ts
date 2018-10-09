import { ChangeDetectorRef } from '@angular/core';

import { from, Subject, Subscription, Observable } from 'rxjs';
import { timeout, delay, map } from 'rxjs/operators';

import { GetQiniuTokenRequest } from '../../interface/request.interface';
import { GetQiniuTokenResponse } from '../../interface/response.interface';

interface UploadFile {
    name: string;
}

export abstract class UploadService {

    /**
     * 获取 token 的方法
     */
    abstract launchQiniuToken(source: Observable<GetQiniuTokenRequest>): Subscription;

    /**
     * 上传文件的方法
     */
    abstract uploadImage(fileObs: Observable<UploadFile>): Observable<{ index: number; obs: Qiniu.Observable }>;

    /**
     * @ignore
     */
    abstract getQiniuTokenResponse(): Observable<GetQiniuTokenResponse>;

    /**
     * 清除token
     */
    abstract clearQiniuToken(): void;
}

export const QiniuErrorCode = {
    200: '操作执行成功。',
    298: '部分操作执行成功。',
    400: '请求报文格式错误。包括上传时，上传表单格式错误；URL 触发图片处理时，处理参数错误；[资源管理][rsHref] 或 持久化数据处理 (pfop) 操作请求格式错误。',
    401: '认证授权失败。 包括密钥信息不正确；数字签名错误；授权已超时。',
    404: '资源不存在。 包括空间资源不存在；镜像源资源不存在。',
    405: '请求方式错误。 主要指非预期的请求方式。',
    406: '上传的数据 CRC32 校验错误。',
    419: '用户帐户被冻结。',
    478: '镜像回源失败。主要指镜像源服务器出现异常。',
    503: '服务端不可用。',
    504: '服务端操作超时。',
    573: '单个资源访问频率过高。',
    579: '上传成功但是回调失败。包括业务服务器异常；七牛服务器异常；服务器间网络异常。',
    599: '服务端操作失败',
    608: '资源内容被修改。',
    612: '指定资源不存在或已被删除。',
    614: '目标资源已存在。',
    630: '已创建的空间数量达到上限，无法创建新空间。',
    631: '指定空间不存在。',
    640: '调用列举资源 (list) 接口时，指定非法的marker参数。',
    701: '在断点续上传过程中，后续上传接收地址不正确或ctx信息已过期。',
};

export class UploadBaseComponent {

    /**
     * 需要上传的文件
     */
    files: UploadFile[] = [];

    /**
     * Upload file amount limit;
     */
    limit = 5;

    /**
     * @ignore
     */
    allowedContentTypes = 'image/jpg, image/png, image/jpeg, image/gif';

    /**
     * 是否正在上传
     */
    uploading$: Subject<boolean> = new Subject();

    /**
     * 上传完成的图片数量
     */
    protected uploadedCount = 0;

    /**
     * @ignore
     */
    protected urlPrefix: string = location.protocol === 'https' ? 'https://dn-filebox.qbox.me/' : 'http://7xi2n7.com1.z0.glb.clouddn.com/';

    /**
     * 上传成功生成的url
     */
    url$: Subject<string> = new Subject();

    constructor(
        public changeRef: ChangeDetectorRef,
        public uploadService: UploadService,
    ) {

    }

    /**
     * @ignore
     */
    beforeUpload = (file: UploadFile) => {
        this.files.push(file);

        return false;
    }

    /**
     * 上传文件
     */
    uploadFile() {
        this.uploadService.launchQiniuToken(from(this.files).pipe(
            map(({ name }) => ({ name }))
        ));

        this.uploadService.uploadImage(from(this.files).pipe(
            delay(100)
        )).pipe(
            timeout(10000)
        ).subscribe(
            engine => engine.obs.subscribe(this.createUploadObserver()),
            _ => this.tokenError(),
            () => this.uploadService.clearQiniuToken()
        );

        this.uploading$.next(true);
    }

    /**
     * @ignore;
     */
    protected tokenError(): void {
        this.reset();

        // this.tipService.messageError('IMAGE_TOKEN_ERROR_OR_TIMEOUT');

        this.uploadService.clearQiniuToken();
    }

    /**
     * Get upload image observer;
     */
    protected createUploadObserver(): Qiniu.Observer {
        return {
            next: _ => { },
            error: ({ code }: Qiniu.Error) => {
                // this.tipService.messageError(QiniuErrorCode[code]);

                this.reset();
            },
            complete: obj => {
                this.url$.next(this.urlPrefix + obj.key);

                this.uploadedCount += 1;

                if (this.uploadedCount === this.files.length) {
                    this.reset();
                }
            },
        };
    }

    /**
     * @ignore
     */
    protected reset(): void {
        this.uploading$.next(false);

        this.uploadedCount = 0;

        this.files = [];

        this.changeRef.detectChanges();
    }
}
