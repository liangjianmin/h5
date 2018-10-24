
import {
  apis,
  getData
} from './index';

import { Indicator, Toast } from 'mint-ui';

export default {
    getHome(cb) {
        Indicator.open({
          text: '拼命加载...',
          spinnerType: 'triple-bounce'
        });

        getData({
          url: apis.appIndex,
          success: (data) => {
            Indicator.close();
            if (data.code === 0) {
                cb(data.data);
            } else {
                Toast({
                  message: data.msg,
                  duration: 1500
                });
            }
          },
          error(data) {
            Indicator.close();
            Toast({
              message: data.msg,
              duration: 1500
            });
          }
        }).catch(function (err) {
          Indicator.close();
        });
    }
}