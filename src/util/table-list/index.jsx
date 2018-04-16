import React from 'react';

//通用列表
class TableList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isFirstLoading : true       //第一次加载时显示
        }
    }
    componentWillReceiveProps(){
        //列表在第一次加载的时候，isFirstLoading 为true
        this.setState({
            isFirstLoading:false
        })
    }
    
    render(){
        //表头
        let tableHeader = this.props.tableHeads.map((tableItem,index) =>{
            if(typeof tableItem === 'object'){
                return <th key={index} width={tableItem.width}>{tableItem.name}</th>
            }else if(typeof tableItem === 'string'){
                return <th key={index}>{tableItem}</th>
            }
        })
        //内容
        let listBody = this.props.children;

        //信息
        let listInfo = (
            <tr>
                <td colSpan={this.props.tableHeads.length} className="text-center">
                    {this.state.isFirstLoading ? '正在加载数据...' : '没有找到相应的结果~'}</td>
            </tr>
        )
        let tableBody = listBody.length > 0 ? listBody : listInfo;
        return(
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                {tableHeader}
                            </tr>
                        </thead>
                        <tbody> 
                            {tableBody}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TableList;