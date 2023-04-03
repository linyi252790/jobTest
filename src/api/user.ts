// @ts-nocheck
import request from '../util/request';


interface IUserResponse {
    statusCode: number;
    message: string;
    data: {
        userInfo: UserInfo;
        token: string;
    };
}

interface UserInfo {
    _id: string;
    imageUrl: string;
    isShow: boolean;
    name: string;
    email: string;
    jurisdiction: string[];
}

/**
 * 手机号码登录
 * @param phone
 * @param code
 */
export const phoneLogin = ({phone, code}): Promise<IUserResponse> => {
    let url = '/api/user/phone-login';
    return request.post(url, {phone, code});
}


interface IResumeResponse {
    statusCode: number;
    message: string;
    data: {
        result: string[];
        total: number;
    };
}

/*
* 用户简历列表
* */
export const userResumeList = (): Promise<IResumeResponse> => {
    let url = '/api/v1/company/company-resume-list';
    return request.post(url);
}

/*简历pdf上传*/

export const uploadResume = (data) => {
    let url = '/api/upload/store';
    return request.post(url, data);
}

/**
 * 更新用户的简历列表
 * @param data
 */
export const addUserResume = (data) => {
    let url = '/api/v1/company/company-resume-add';
    return request.post(url, data);
}

/*
* 简历的删除
* */
export const delUserResume = (data) => {
    let url = '/api/v1/company/company-resume-remove';
    return request.post(url, data);
}

/*简历的投递*/
export const deliveryUserResume = (data) => {
    let url = '/api/v1/company/company-resume-post';
    return request.post(url, data);
}

/*用户已投递的简历
* */
export const userDeliveryResumeList = () => {
    let url = '/api/v1/company/company-resume-post-list';
    return request.post(url);
}

/*岗位的收藏新增
* */
export const collectWork = (data) => {
    let url = '/api/v1/company/company-work-fav-add';
    return request.post(url, data);
}

/*
*岗位的收藏列表
* */
export const collectWorkList = () => {
    let url = '/api/v1/company/company-work-fav-list';
    return request.post(url);
}

/*
* 岗位的移除
*
* */

export const delCollectWork = (data) => {
    let url = '/api/v1/company/company-work-fav-remove';
    return request.post(url, data);
}


/*
* 公司的收藏
* */

export const collectCompany = (data) => {
    let url = '/api/v1/company/company-fav-add';
    return request.post(url, data);
}
