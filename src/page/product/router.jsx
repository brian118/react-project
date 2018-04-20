//商品管理模块路由处理

import React from 'react';
import { BrowserRouter as Router, Switch, Redirect, Route, Link} from 'react-router-dom';


//子页面
import ProductList from 'page/product/index/index.jsx'; //商品列表页
import productSave from 'page/product/index/save.jsx' ; //商品编辑页
import prodcutDetail from 'page/product/index/detail.jsx' //商品详情页
import categoryList from 'page/product/category/index.jsx'; //品类管理
import categoryAdd from 'page/product/category/add.jsx'; //品类添加

class ProductRouter extends React.Component{
    render(){
        return(
            <Switch>
                <Route path = '/product/index' component={ProductList} />
                <Route path = '/product/save/:pid?' component={productSave} />
                <Route path = '/product-category/index/:categoryId?' component={categoryList} />
                <Redirect exact from="/product" to="product/index" />
                <Redirect exact from="/product-category" to="/product-category/index" />
                {/*<Route path = '/product/detail/:pid' component={prodcutDetail} />
                <Route path = '/productCategory/index/:categoryId' component={categoryList} />
                <Route path = '/productCategory/add' component={categoryAdd} />
                <Redirect exact from="/product" to="/product/index" />
                <Redirect exact from="/productCategory" to="/productCategory/index" />*/}
            </Switch>
        )
    }
}

export default ProductRouter;

