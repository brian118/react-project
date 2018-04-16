import React from 'react';

class SerachList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            orderNumber : ''
        }
    }
    //数据变化时
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value.trim();
        this.setState({
            [name]:value
        });
    }
    //点搜索时
    onSearch(){
        this.props.onSearch(this.state.orderNumber);
    }
    //回车
    onSearchKeyword(e){
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
                            <select name="" id="" className="form-control">
                                <option value="1">按订单查询</option>
                                <option value="2">按品类查询</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <input type="text" 
                                className = "form-control"
                                placeholder = "订单号"
                                name ="orderNumber"
                                onKeyUp ={(e) =>{this.onSearchKeyword(e)}}
                                onChange = {(e) =>{this.onValueChange(e)}} />
                        </div>
                        <button className="btn btn-primary" onClick = {(e) => this.onSearch()}>
                            搜索
                        </button>
                    </div>
                </div>
            </div>
        )
    }
} 

export default SerachList;