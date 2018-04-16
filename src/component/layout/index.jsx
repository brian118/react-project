/*
* 页面主题架构
*/
import React from 'react';

import NavTop from 'component/nav-top/index.jsx';	//头部菜单栏
import NavSide from 'component/nav-silde/index.jsx';	//左侧菜单栏

import './theme.css';
import './index.scss';

class Layout extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return(
			<div id="wrapper">
				<NavTop />
				<NavSide />
				{this.props.children}
			</div>
		)
	}
}

export default Layout;