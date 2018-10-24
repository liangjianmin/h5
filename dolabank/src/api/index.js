import axios from 'axios';

import domain from './domain';
import Util from '../util';

export const apis = {
    appIndex: domain.urlApi + 'v1/app/appindex'
}

/*
 * getData: 获取数据
 * url: 接口
 * data: {} 数据
 * platform: 平台
 * success: 成功
 * error: 失败
 */
export function getData(options) {
  let Codekey = Util.getRrandomStr();
  let token = Util.getCookie('token');
//   token = 'a6a8f355bbf54305c866a8308e88583c';
  let platform = options.platform || 'wechat';
  let params = Util.getParams(platform, token, options.data);

  console.log(params);
  params = Util.encryption(Codekey, params, 'code');

  return axios.get(options.url, {
    params: {
      data: params
    },
    headers: {
      'X-Dola-Code': Codekey
    }
  }).then((res) => {
    var key = res.headers['x-dola-edoc'];
    var data = res.data;
    var str = Util.decrypt(key, data, 'code')
    var data = JSON.parse(str);
    // console.log(data);
    if (data.code == 0) {
      if (options.success && typeof options.success === 'function') {
        options.success(data);
      }

    } else {
        if (options.error && typeof options.error === 'function') {
          options.error(data);
        }
    }
  })
}