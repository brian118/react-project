import React from 'react';
import {Link} from 'react-router-dom';
import Mutil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

import PageTile from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';

const _mm = new Mutil();
const _product = new Product();


class CategoryList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            list : [],
            parentCategoryId : this.props.match.params.categoryId || 0
        }
    }
    componentDidMount(){
        this.loadCategoryList();
    }
    componentDidUpdate(prevProps,prevState){
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId = this.props.match.params.categoryId || 0;
        if(oldPath != newPath){
            this.setState({
                parentCategoryId:newId
            },() =>{
                this.loadCategoryList();
            })
        }
    }
    //加载品类列表
    loadCategoryList(){
        console.log(1234)
        _product.getCategoryList(this.state.parentCategoryId).then(res =>{
            this.setState({
                list:res
            });
        },errMsg =>{
            _mm.errorTips(errMsg);
        })
    }
    //更新品类名字
    onUpdateName(categoryId,categoryName){
        let newName = widnow.prompt('请输入新的品类名称',categoryName);
        if(newName){
            _product.updateCategoryName({
                categoryId:categoryId,
                categoryName:categoryName
            }).then(res =>{
                _mm.successTips(res);
                this.loadCategoryList();
            },errMsg =>{
                _mm.errorTips(errMsg);
            })
        }
    }
    render(){
        let listBody = this.state.list.map((category ,index) =>{
            return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                        <a href="javascript:;" className="opear"
                        onClick = {(e) => this.onUpdateName(category.id ,category.name)} >修改名称</a>
                    {
                        category.parentId === 0
                        ? <Link to={`/product-category/index/${category.id}`}>查看子品类</Link>
                        : null
                    }
                    </td>
                </tr>
            )
        });
        return(
            <div id="page-wrapper">
                <PageTile title="品类列表">
                    <div className="page-header-right">
                        <Link to="/product-category/add" className="btn btn-primary">
                            <i className="fa fa-plus">
                                <span>添加品类</span>
                            </i>
                        </Link>
                    </div>
                </PageTile>
                <div className="row">
                    <div className="col-md-12">
                        <p>父品类ID：{this.state.parentCategoryId}</p>
                    </div>
                </div>
                <TableList tableHeads={['品类ID','品类名称','操作']}>
                    {listBody}
                </TableList>
            </div>
        )
    }
}

export default CategoryList;