import React from 'react';

class PageTitle extends React.Component{
    constructor(porps){
        super(porps);
    }
    componentWillMount(){
        document.title = this.props.title + '-管理系统';
    }
    render(){
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1 className="page-header">{this.props.title}</h1>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default PageTitle;