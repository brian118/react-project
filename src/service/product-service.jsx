import Mutil from 'util/mm.jsx';

const _mm = new Mutil();

class Product{
    //商品列表
    getProductList(listParam){
        console.log(listParam)
        let url = '',
            data = {};
        if(listParam.listType === 'list'){               //列表
            url = '/api/productList';
            data.pageNum = listParam.pageNum;
        }else if(listParam.listType === 'search'){       //查询
            url = '/api/productList';
            data.pageNum = listParam.pageNum;
            data[listParam.searchType] = listParam.searchKeyword;
        }
        return _mm.request({
            type : "post",
            url :url,
            data : data
        });
    }
    //商品详情
    getProductDetail(productId){
        return _mm.request({
            type :"post",
            url:"/api/productDetail",
            data :{
                productId : productId || 0
            }
        });
    }
    //下架
    setProductStatus(productInfo){
        return _mm.request({
            type : 'post',
            url :'/api/product/set_sale_status',
            data:productInfo
        })
    }
    // 检查保存商品的表单数据
    checkProduct(product){
        let result = {
            status: true,
            msg: '验证通过'
        };
        // 判断用户名为空
        if(typeof product.name !== 'string' || product.name.length ===0){
            return {
                status: false,
                msg: '商品名称不能为空！'
            }
        }
        // 判断描述不能为空
        if(typeof product.subtitle !== 'string' || product.subtitle.length ===0){
            return {
                status: false,
                msg: '商品描述不能为空！'
            }
        }
        // 验证品类ID
        if(typeof product.categoryId !== 'number' || !(product.categoryId > 0)){
            return {
                status: false,
                msg: '请选择商品品类！'
            }
        }
        // 判断商品价格为数字，且大于0
        if(typeof product.price !== 'number' || !(product.price >= 0)){
            return {
                status: false,
                msg: '请输入正确的商品价格！'
            }
        }
        // 判断库存为数字，且大于或等于0
        if(typeof product.stock !== 'number' || !(product.stock >= 0)){
            return {
                status: false,
                msg: '请输入正确的库存数量！'
            }
        }
        
        return result;
    }
    //保存商品
    saveProduct(product){
        return _mm.request({
            type:"post",
            url:"/api/product/save",
            data:product
        })
    }

    //品类列表1级
    getCategoryList(parentCategoryId){
        return _mm.request({
            type:'post',
            url:'/api/category/get_category',
            data:{
                categoryId:parentCategoryId || 0
            }
        });
    }
    //品类列表2级
    getCategoryList2(categoryId){
        return _mm.request({
            type:'post',
            url:'/api/category/get_category2',
            data:{
                categoryId:categoryId || 0
            }
        });
    }
    //新增品类
    saveCategory(category){
        return _mm.request({
            type:'post',
            url:'/api/category/add_category',
            data:category
        });
    }
    //修改品类名称
    updateCategoryName(category){
        return _mm.request({
            type:'post',
            url:'/api/category/set_category',
            data:category
        });
    }
    
}
export default Product;