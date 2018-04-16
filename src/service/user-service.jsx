/*
* 用户登录，退出请求接口
*/

import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class User{
    //用户登录
    login(info){
        return _mm.request({
            type:'post',
            url:'/api/login',
            data:info
        });
    }
    //检查登录接口的数据是不是合法
    checkLoginInfo(info){
        let userName = $.trim(info.username),
            password = $.trim(info.password);
        //判断用户名为空
        console.log(userName,password)
        if(typeof userName !== 'string' || userName.length === 0){
            return {
                status:false,
                msg:'用户名不能为空！'
            }
        }
        //判断密码为空
        if(typeof password !== 'string' || password.length === 0){
            return {
                status:false,
                msg:'密码不能为空！'
            }
        }
        return{
            status:true,
            msg:'验证通过'
        }
    }
    //退出登录
    logout(){
        return _mm.request({
            type    :'post',
            url     : '/api/logout'
        });
    }
    getUserList(pageNum){
        return _mm.request({
            type:'post',
            url:'/api/list',
            data:{
                pageNum:pageNum
            }
        })
    }
}

export default User;