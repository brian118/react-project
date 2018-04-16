import Mutil from "util/mm.jsx";
const _mm = new Mutil();

class Order{
    //列表
    getOrderList(listParam){
        let url = '',
            data = {};
        if(listParam.listType === 'list'){
            url = '/api/orderList',
            data.pageNum = listParam.pageNum;
        }else if(listParam.listType === 'search'){
            url = '/api/orderSearch',
            data.pageNum = listParam.pageNum,
            data.orderNo = listParam.orderNo;
        }

        return _mm.request({
            type : 'post',
            url :url,
            data : data
        });
    }
    //订单详情
    getOrderDetail(orderNumber){
        return _mm.request({
            type : 'post',
            url :'/api/orderDetail',
            data:{
                orderNo : orderNumber
            }
        });
    }
    sendGoods(orderNumber){
        return _mm.request({
            type : 'post',
            url :'/api/orderSendGoods',
            data:{
                orderNo : orderNumber
            }
        })
    }
}
export default Order;