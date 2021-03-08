/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import {intentsList} from '../intents';
import ChatBotComponentRow from './ChatBotComponentRow'
import { Container, Row, Col, Button } from "react-bootstrap";

class ChatBotComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intentData: intentsList,
      hideData:false,
      selectedData:[],
      isChecked:false,
    };
  }

  nextStep = (e) => {
    e.preventDefault();
    this.setState({ hideData: !this.state.hideData });
  }
  deSelectQuery =(e)=>{
    let intentList= this.state.intentData;
    this.setState({selectedData:[],isChecked:false,intentData:[...intentList]})
  }
  selectQuery = (e) => {
    this.setState({
      isChecked:!this.state.isChecked,
    },()=> {
      if(this.state.isChecked) {
        this.setState({
          selectedData:[...intentsList],
        })
      } else {
        let a=[];
        this.setState({
          selectedData:[...a],
        })
      }
    });
  }

  setSelectedData=(selectedId,checkedValue,index)=> {
    console.log(checkedValue);
    console.log(selectedId);
    if(checkedValue)
    {
      let idExists = this.state.selectedData.filter((selectedData)=>{
        return (selectedData.id === selectedId)
      });
      if(idExists.length === 0) {
        let existingData=this.state.selectedData;
        existingData.push(this.state.intentData[index]);
        this.setState({selectedData:[...existingData]});
      }
    } else {
      let removeSelectedId=this.state.selectedData.filter((selectedData) => { return selectedData.id !== selectedId });
      this.setState({selectedData:[...removeSelectedId]});
      
    } 
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col>
            <h3 style={{'textAlign':'center', }}> Welcome to Personalized Chat Bot Creator</h3>
            <h4 style={{'textAlign':'center', }}> Some of the in-built  Queries available in the Application </h4>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}  >
            <h3>Step 1
           <Button type='submit' className="pull-right" size="lg">{
            `Next Step` }</Button></h3>
          </Col>
        </Row>
        <Row style={{'marginTop':'10px', }}>
          <Col xs={6} md={6}>
            <div className='scrollable-table'>
              <table className='table table-bordered table-responsive'>
                <thead>
                  <tr>
                    <th>Select <input type='checkbox' onChange={(e)=>{this.selectQuery(e)}} checked={this.state.isChecked === true}/></th>
                    <th>Query Names </th>
                    <th>Query Description </th>
                    <th>Query Samples </th>
                    <th>Query Response </th>
                  </tr>
                </thead>
                <tbody>
                {this.state.intentData.map(({id, description, name, trainingData,reply },index) => (
                  <ChatBotComponentRow key={id} id={id} description={description} name={name} trainingData={trainingData} reply={reply} checked={this.state.isChecked} setCheckedData={this.setSelectedData} index={index}/>
                  ))}
                </tbody>
              </table>
            </div>
          </Col>
          <Col xs={6} md={6}>
            {this.state.selectedData.length>0 &&
              <div className='scrollable-table'>
                <table className='table table-bordered table-responsive'>
                  <thead>
                    <tr>
                      <th>Select <input type='checkbox' onChange={(e)=>{this.deSelectQuery(e)}} defaultChecked={true}/></th>
                      <th>Query Names </th>
                      <th>Query Description </th>
                      <th>Query Samples </th>
                      <th>Query Response </th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.state.selectedData.map(({id, description, name, trainingData,reply },index) => (
                    <ChatBotComponentRow key={id} id={id} description={description} name={name} trainingData={trainingData} reply={reply} checked={true} setCheckedData={this.setSelectedData} index={index}/>
                    ))}
                  </tbody>
                </table>
              </div>
            }
            {
              (this.state.selectedData.length === 0) &&
                <h1>
                  Please Select Queries on the left side 
                </h1>
            }
          </Col>
        </Row>
      </Container>  
    );
  }
}


export default ChatBotComponent;