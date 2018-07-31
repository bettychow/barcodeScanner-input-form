import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAllUPC, addUPC } from '../actions'
import {
  Button,
  Form,
  FormGroup,
  Label,
  Container,
  Row,
  Alert,
  Input
} from 'reactstrap'

class InputForm extends Component {

  state = {
    name: '',
    upc: '',
    visible: true,
    nameInput: null,
    upcInput: null,
    clearAllUPC: false
  }

  handleProductName = this.handleProductName.bind(this)
  handleUPC = this.handleUPC.bind(this)
  HandleGetAllUPC = this.HandleGetAllUPC.bind(this)
  handleSubmit = this.handleSubmit.bind(this)
  handleClear = this.handleClear.bind(this)
  onDismiss = this.onDismiss.bind(this)

  handleProductName(e) {
    this.setState({
      name: e.target.value
    })
  }

  handleUPC(e) {
    this.setState({
      upc: e.target.value
    })
  }

  HandleGetAllUPC(e) {
    if(e.target.innerHTML === 'Get All UPC') {
      this.setState({
        clearAllUPC: false
      })
      this.props.getAllUPC()
      e.target.innerHTML = 'Clear All UPC'
    } else {
      this.setState({
        clearAllUPC: true
      })
      e.target.innerHTML = 'Get All UPC'
    }
  }

  handleSubmit(e) {
    this.setState({
      visible: true,
      nameInput: null,
      upcInput: null
    })
    e.preventDefault();
    
    if(this.state.name && this.state.upc) {
      this.props.addUPC(this.state.name, this.state.upc)
        .then(() => {  
            this.setState({
              name: '',
              upc: ''
            })
        })
    }  else {
        if(!this.state.upc) {
          this.setState({
            upcInput: false
          })
        }
        if(!this.state.name) {
          this.setState({
            nameInput: false
          })
        }
      }
}
  
  handleClear() {
    this.setState({
      name: '',
      upc: ''
    })
  }

  onDismiss() {
    this.setState({ 
      visible: false
    })
  }

  render() {
    const inputMessage = this.props.message === 'UPC already exists!' ? 
      (
        <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
          {this.props.message}
        </Alert>
      ) :
      this.props.message !== ''?
      (
        <Alert color="primary" isOpen={this.state.visible} toggle={this.onDismiss}>
          {this.props.message}
        </Alert>
      ) :
      ''
      const nameInputMessage = this.state.nameInput === false? (
        <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
          Product name is required
        </Alert>
      ): ''

      const upcInputMessage = this.state.upcInput === false? (
        <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
          UPC code is required
        </Alert>
      ): ''

      const printAllUPC = this.state.clearAllUPC? '': JSON.stringify(this.props.allUPC).slice(1, JSON.stringify(this.props.allUPC).length -1 )

      return (
        <Container>
          <h1 style={{marginTop: '15vh'}} >Input Form for Product and UPC</h1>
          <Button id="get" className="mr-3" type="clear" color="primary" style={{border: "solid", borderWidth: 1, marginTop: 50}} onClick={this.HandleGetAllUPC}>
                  Get All UPC
          </Button>
          <Row style={{marginTop: '10vh'}}>
            <Form onSubmit={this.handleSubmit} inline style={{marginLeft: 'auto', marginRight: 'auto'}}>       
              <FormGroup style={{marginRight: 10}}>
                <Label for="product-name" style={{marginRight: 10}}>Product Name</Label>
                  <Input
                    type="product"
                    name="product"
                    id="product-name"
                    placeholder="e.g. H+B Orange Juice"
                    value={this.state.name}
                    onChange={this.handleProductName}
                    style={{width: 550}}
                  />                  
              </FormGroup>
              <FormGroup style={{marginRight: 10}}>
                <Label for="password-field" style={{marginRight: 10}}>UPC</Label>
                <Input
                  type="upc"
                  name="upc"
                  id="upc-code"
                  placeholder="e.g. 0123456789181"
                  value={this.state.upc}
                  onChange={this.handleUPC}
                  style={{width: 200}}
                />             
              </FormGroup>
              <Button className="mr-3" type="submit" color="primary" >
                  Submit
              </Button>              
            </Form> 
            <Button className="mr-3" type="clear" color="white" style={{border: "solid", borderWidth: 1}} onClick={this.handleClear}>
                  Clear
            </Button>
          </Row>
          <div style={{marginLeft: 'auto', marginRight: 'auto', width: 550, marginTop: 30}}>
            {inputMessage}
            {nameInputMessage}
            {upcInputMessage}
          </div>
          <div>
            { printAllUPC }
          </div>
        </Container>
      )
  }
}

const mapStateToProps = state => {
  return {
    message: state.upc.message,
    upcExists: state.upc.upcExists,
    allUPC: state.upc.allUPC
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  getAllUPC,
  addUPC
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps )(InputForm)