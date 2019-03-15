
import Taro from '@tarojs/taro';
class Http {
    constructor() {
        this.requestConfig = {
            method: "get",
            body: undefined,
            credentials: "include",
            Authorization: undefined,
            header: {
                "Content-Type": "application/json;charset=utf-8",
                "Accept": "application/json"
            }
        }
    }
    handle(url, method, data = {}, fn) {
        let header = { ...{}, ...this.requestConfig.header }
        typeof data === "function" ? fn = data : !1;
        const option = {
            isShowLoading: false,
            url,
            data,
            method,
            header,
            success(res) {
                fn(res.data)
            },
            error(res) {
                fn(res)
            }
        }

        if (method === 'upload') {
            option.method = 'post';
        }
        return Taro.request(option)
    }

    get(url, data, fn) { return this.handle(url, 'get', data, fn) }
    post(url, data, fn) { return this.handle(url, 'post', data, fn) }
    upload(url, data, fn) { return this.handle(url, 'upload', data, fn) }

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
    getCookie(key) {
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
    getQueryValue(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        let subString = location.href.split('?')[1] || '';
        let r = subString.match(reg);
        let newObj = {};
        let urlArr = subString.length ? subString.replace(/\=|\&/g, ',').split(',') : [];
        if (name) {
            if (r != null) return decodeURI(r[2]); return null;
        } else {
            urlArr.forEach((e, i) => { !(i % 2) ? newObj[e] = urlArr[i + 1] : !1 })
            return newObj;
        }
    }
}

export default new Http();