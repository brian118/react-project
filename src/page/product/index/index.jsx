import React from 'react';
import { Link } from 'react-router-dom';
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';


import PageTitle from 'component/page-title/index.jsx';
import SearchInput from './index-search.jsx';
import TableList from 'util/table-list/index.jsx';
import Pageination from 'util/pagination/index.jsx';


import './index.scss';

const _mm = new MUtil();
const _product = new Product();


class ProductList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list:[],
            pageNum:1,
            listType:'list'
        }
    }
    
    componentDidMount(){
        this.loadProductList();
    }
    //加载商品列表
    loadProductList(){
        let param = {};
        param.listType = this.state.listType;
        param.pageNum = this.state.pageNum;
        //如果搜索
        if(this.state.listType === 'search'){
            param.searchType = this.state.searchType;
            param.searchKeyword = this.state.searchKeyword;
        }
         //请求
        _product.getProductList(param).then(res =>{
            this.setState(res);
        },errMsg =>{
            this.state =({
                list:[]
            })
            _mm.errorTips(errMsg);
        });
    }
    //搜索
    onSearch(searchType,searchKeyword){
        let listType = searchKeyword === '' ? 'list' : 'search';
        this.setState({
            listType : listType,
            pageNum : 1,
            searchType :searchType,
            searchKeyword :searchKeyword
        } , () =>{
            this.loadProductList();
        })
    }
    //页数发生变化的是
    onPageNumChange(pageNum){
        this.setState({
            pageNum:pageNum
        },()=>{
            this.loadProductList();
        })
    }
    //下架
    setProductStatus(e,productId,currentStatus){
        let newStatus   = currentStatus == 1 ? 2 : 1,
        confrimTips = currentStatus == 1 
            ? '确定要下架该商品？' : '确定要上架该商品？';
        if(window.confirm(confrimTips)){
            _product.setProductStatus({
                productId: productId,
                status: newStatus
            }).then(res => {
                _mm.successTips(res);
                this.loadProductList();
            }, errMsg => {
                _mm.errorTips(res);
            });
        }
    }
    render(){
        let headers = [
            {name:'商品ID',width:'10%'},
            {name:'商品信息',width:'50%'},
            {name:'价格',width:'10%'},
            {name:'状态',width:'15%'},
            {name:'操作',width:'15%'}
        ];
        return(
            <div id="page-wrapper">
                <PageTitle title="商品列表">
                    <div className="page-header-right">
                        <Link to="/product/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加商品</span>
                        </Link>
                    </div>
                </PageTitle>
                <SearchInput onSearch={(searchType , searchKeyword) =>{this.onSearch(searchType ,searchKeyword)}} />
                <TableList tableHeads={headers}>
                    {
                        this.state.list.map((product,index) =>{
                            return (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>
                                        <p>{product.name}</p>
                                        <p>{product.subtitle}</p>
                                    </td>
                                    <td>￥{product.price}</td>
                                    <td>
                                        <p>{product.status == 1 ? '在售':'已下架'}</p>
                                        <button className="btn btn-xs btn-warning" onClick={(e) =>{this.setProductStatus(e,product.id,product.status)}}>{product.status == 1 ? '下架' : '上架'}</button>
                                    </td>
                                    <td>
                                        <Link className="opear" to={`/product/detail/${product.id}`}>详情</Link>
                                        <Link className="opear" to={`/product/save/${product.id}`}>编辑</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </TableList>
                <Pageination current={this.state.pageNum} total={this.state.total} onChange={(pageNum) => this.onPageNumChange(pageNum)} /> 
            </div>
            
        )
    }
}

export default ProductList;
