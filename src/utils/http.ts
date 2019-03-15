
import Taro from '@tarojs/taro';

interface Http {
    requestConfig: {
        method: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT' | undefined,
        body: undefined,
        credentials: string,
        Authorization: undefined | string,
        header: Object
    }
}
class Http {
    constructor() {
        this.requestConfig = {
            method: "GET",
            body: undefined,
            credentials: "include",
            Authorization: undefined,
            header: {
                "Content-Type": "application/json;charset=utf-8",
                "Accept": "application/json"
            }
        }
    }
    handle(url: string, method: 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT' | undefined, data: Object | Function = {}, fn: Function):Object {
        let header = { ...{}, ...this.requestConfig.header }
        interface option { }
        const option = {
            isShowLoading: false,
            url,
            data,
            method,
            header,
            success(res: Object) {
                fn(res['data'])
            },
            error(res: Object) {
                fn(res)
            }
        }

        if (method === 'OPTIONS') {
            option.method = 'POST';
        }
        return Taro.request(option)
    }

    get(url: string, data: Object | Function, fn: Function):Object { debugger;typeof data === "function" ? fn = data : !1; return this.handle(url, 'GET', data, fn) }
    post(url: string, data: Object | Function, fn: Function):Object { typeof data === "function" ? fn = data : !1; return this.handle(url, 'POST', data, fn) }
    upload(url: string, data: Object | Function, fn: Function):Object { typeof data === "function" ? fn = data : !1; return this.handle(url, 'OPTIONS', data, fn) }

    // 修改请求头
    setRequestHeader(object) {
        const isObj = typeof object === 'object'
        if (isObj) {
            if (object instanceof Array) {
                throw Error("参数不可以是Array类型");
            } else {
                this.requestConfig.header = Object.assign(this.requestConfig.header, object);
                return this;
            }
        } else {
            throw Error("参数必须为OBJECT类型");
        }
    }
    // 获取某个cookie
    getCookie(key: undefined | string): Object | Boolean {
        var cArray = document.cookie.split(';'),
            newObj = key ? !1 : {};
        for (var i = 0, e; (e = cArray[i]) != undefined; i++) {
            var item = e.split('=');
            if (key) {
                if (key === item[0].trim()) {
                    newObj = item[1];
                    break;
                }
            } else {
                newObj[item[0].trim()] = item[1];
            }
        }
        return newObj;
    }

    // 获取URL(某个或所有)参数
    getQueryValue(name: undefined | string): null | string | Object {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let substring = location.href.split('?')[1] || '';
        let r = substring.match(reg);
        let newObj = {};
        let urlArr = substring.length ? substring.replace(/\=|\&/g, ',').split(',') : [];
        if (name) {
            if (r != null) return decodeURI(r[2]); return null;
        } else {
            urlArr.forEach((e, i) => { !(i % 2) ? newObj[e] = urlArr[i + 1] : !1 })
            return newObj;
        }
    }
}

export default new Http();