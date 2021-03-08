import React, { Component } from "react";
import {intentsList} from '../intents';

class ChatBotComponentRow extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        moreQueries:false,
        intentData:intentsList,
        isChecked:this.props.checked,
    };
  }
  
  
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.checked !== this.props.checked) {
      this.setState({  isChecked: this.props.checked });
    }
    
  }
  
  setMoreQueries=()=>{
    this.setState({ moreQueries: !this.state.moreQueries });
  }
  
  selectData=(e)=>{
    let selectedId=e.target.id;
    this.setState({ isChecked: !this.state.isChecked },()=> {
      console.log(this.state.isChecked);
      this.props.setCheckedData(selectedId,this.state.isChecked,this.props.index);
      });
    
  }
  
  render() {
    return (
      <tr key={`intentList-table-${this.props.id}`}>
        <td><input type='checkbox' id={this.props.id} checked={this.state.isChecked === true} onChange={(e)=>{this.selectData(e)}}/></td>
        <td>
          {this.props.name}
        </td>
        <td >
          {this.props.description}
        </td>
        <td >
          {!this.state.moreQueries && <>
            <h4> {this.props.trainingData.expressions[0].text}</h4> 
            <span style={{color:'blue',cursor:'pointer'}} onClick={this.setMoreQueries}>More Query Names....</span> 
          </>}
          {this.state.moreQueries &&<>
            {this.props.trainingData.expressions.map(({text,id})=>
              <h4 key={id}>{text}</h4>
            )}
            <span style={{color:'blue',cursor:'pointer'}} onClick={this.setMoreQueries}>less Query Names....</span> 
          </> }
        </td>
        <td>
          {this.props.reply.text}
        </td> 
      </tr>

    );
  }
}


export default ChatBotComponentRow;