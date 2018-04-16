import React from 'react';

class SearchInput extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchType : 'productId',
            searchKeyword : ''
        }
    }
    //数据变化的时候
    onValChage(e){
        let name = e.target.name,
            val = e.target.value;
        this.setState({
            [name]:val
        });
    }
    //点击按钮时
    onSearch(){
        this.props.onSearch(this.state.searchType ,this.state.searchKeyword);
    }
    //回车
    onSearchKeywordUp(e){
        if(e.keyCode === 13){
            this.onSearch();
        }
    }
    render(){
        return(
            <div className="row search-wrap">
                <div className="col-md-12">
                    <div className="form-inline">
                        <div className="form-group">
                            <select className="form-control"
                                name ='searchType'
                                onChange = {(e) => this.onValChage(e)}>
                                <option value="productId">按商品ID查询</option>
                                <option value="productName">按商品名称查询</option>
                            </select>
                            <div className="form-group">
                                <input type="text"
                                    className = "form-control"
                                    placeholder="关键词"
                                    name ="searchKeyword"
                                    onKeyUp = { (e) =>{this.onSearchKeywordUp(e)} }
                                    onChange = { (e) => {this.onValChage(e)} }/>
                            </div>
                            <button className ="btn btn-primary" onClick = {(e) =>{this.onSearch()}}>搜索</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchInput;