// @ts-nocheck
import request from '../util/request';


interface IResponse {
    statusCode: number;
    message: string;
}

interface IBannerResponse extends IResponse {
    data: {
        info: Info
    };
}

interface Info {
    _id: string;
    isShow: boolean;
    title: string;
    description: string;
    banners: IBanner[];
}

export interface IBanner {
    _id: string;
    title: string;
    type: number;
    keyWord: string;
    description: string;
    bannerId: string;
    imageUrl: string;
}

/*
* 职业帮首页轮播图
* */
export const getBannersByPos = (): Promise<IBannerResponse> => {
    let url = '/api/v1/banner/bypos?id=62a6f7e1e30a2c5a126f93e3';
    return request.get(url);
}


interface IWorkListResponse extends IResponse {
    data: IWorkList;
}

interface IWorkList {
    list: IWork[];
    total: number;
    totalPage: number;
    size: number;
    currentPage: number;
}

export interface IWork {
    _id: string;
    welfare: string[];
    isNews: boolean;
    isRecommend: boolean;
    title: string;
    workAddress: string;
    workRange: string;
    education: string;
    salary: string;
    companyInfo: ICompanyInfo[];
}

interface ICompanyInfo {
    _id: string;
    title: string;
    logoUrl: string;
    companyNumber: string;
    companyType: string;
}


/**
 * 首页获取岗位列表
 * @param type 1为推荐，2为最新
 * @param page 页码
 * @param size 每页显示的数量
 */
export const getWorkList = (type: number, page?: number = 1, size?: number = 5): Promise<IWorkListResponse> => {
    let url = `/api/v1/company/work-list?page=${page}&size=${size}`;
    if (type == 1) {
        // 推荐
        url += `&isRecommend=1`;

    } else if (type == 2) {
        // 最新
        url += `&isNews=1`;
    }

    return request.get(url);
}


interface IWorkInfoResponse extends IResponse {
    data: IWorkInfo;
}

export interface IWorkInfo {
    _id: string;
    welfare: string[];
    description: IDescription[];
    works: IDescription[];
    isNews: boolean;
    isRecommend: boolean;
    title: string;
    workAddress: string;
    workRange: string;
    education: string;
    salary: string;
    companyId: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    isNew: boolean;
    companyInfo: ICompanyInfo[];
}

interface ICompanyInfo {
    _id: string;
    workTime: string[];
    welfare: IWelfare[];
    title: string;
    logoUrl: string;
    description: string;
    companyRange: string;
    companyNumber: string;
    companyType: string;
    siteUrl: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface IWelfare {
    img: string;
    title: string;
    descp: string;
}

interface IDescription {
    title: string;
}

/*
* 岗位详情接口
* */
export const getWorkInfo = (workid: string): Promise<IWorkInfoResponse> => {
    let url = `/api/v1/company/work-info?workid=${workid}`;
    return request.get(url);
}


/*公司列表
* */
export const getCompanyList = () => {
    let url = `/api/v1/company/company-list`;
    return request.get(url);
}

/*
* 公司的详情
*
* */
export const getCompanyInfo = (companyid: string) => {
    let url = `/api/v1/company/company-info?companyid=${companyid}`;
    return request.get(url);
}
