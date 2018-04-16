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
            url :'/api/set_sale_status',
            data:productInfo
        })
    }
    //保存商品
    saveProduct(product){
        return _mm.request({
            type:"post",
            url:"api/saveProduct",
            data:product
        })
    }

    //品类列表
    getCategoryList(parentCategoryId){
        return _mm.request({
            type:'post',
            url:'/api/category/get_category',
            data:{
                categoryId:parentCategoryId || 0
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