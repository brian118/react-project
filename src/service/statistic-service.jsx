//获取首页数据

import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class statistic{
    getHomeCount(){
        return _mm.request({
            url:'/api/statistic'
        })
    }
}

export default statistic;