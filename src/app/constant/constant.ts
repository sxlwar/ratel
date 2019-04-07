export enum CRUDVar {
    GET = 'get',
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
    SEARCH = 'search',
}

export enum ArticleCategory {
    angular = 'angular',
    rxjs = 'rxjs',
    typescript = 'typescript',
    javascript = 'javascript',
    other = 'other',
    NGX_FORMLY_ZORRO = 'NGX_FORMLY_ZORRO'
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

export const ALLOW_UPLOAD_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
