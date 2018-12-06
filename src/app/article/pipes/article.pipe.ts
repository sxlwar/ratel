import { Pipe, PipeTransform } from '@angular/core';
import { UploadService } from '../../providers/upload.service';

@Pipe({ name: 'imageAddress' })
export class ImageAddressPipe implements PipeTransform {
    /**
     * 七牛图床上的临时地址；
     */
    readonly urlPrefix = 'http://pghicsch6.bkt.clouddn.com/';

    constructor(private uploadService: UploadService) {}

    transform(value: string): string {
        const reg = new RegExp(this.urlPrefix, 'g');

        return value.replace(reg, this.uploadService.urlPrefix);
    }
}
