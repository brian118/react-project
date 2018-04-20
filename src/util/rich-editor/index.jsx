//富文本编辑器依赖jquery
import React from 'react';
import Simditor from 'simditor';
import 'simditor/styles/simditor.scss';
import './index.scss';

class RichEditor extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.loadEditor();
    }
    componentWillReceiveProps(nextProps){
        if(this.props.defaultDetail !== nextProps.defaultDetail){
            this.Simditor.setValue(nextProps.defaultDetail);
        }
    }
    loadEditor(){
        let element = this.refs['textarea'];
        this.Simditor = new Simditor({
            textarea:$(element),
            defaultValue : this.props.placeholder || '请输入内容',
            upload:{
                url : '/api/product/richtext_img_upload',
                defaultImage : '',
                fileKey : 'upload_file'
            }
        });
        this.bindEditorEvent();
    }
    bindEditorEvent(){
        this.Simditor.on('valuechanged', e =>{
            this.props.onValueChange(this.Simditor.getValue());
        })
    }
    render(){
        return(
            <div className="rich-editor">
                <textarea ref="textarea"></textarea>
            </div>
        )
    }
}

export default RichEditor;