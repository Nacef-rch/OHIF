/* eslint-disable react/react-in-jsx-scope */
import React, { Component  } from 'react';
import { withRouter  } from "react-router-dom";
import axios from 'axios';
import './auth.css'

class AddPatient extends Component {

   nextPath(path) {
    this.props.history.push(path);
  }



   fileInput=React.createRef();

  state = {
      PatientName : '',
      PatientId:'',
      ListDicom:[],
    };

handleChangeFile =(e) =>{
    this.setState({ListDicom:e.target.files})
  }

    handleSubmit= (event)=> {
        event.preventDefault()
        const data=this.state;
        console.log('data :', data);
        axios.post('http://localhost:5000/users/login',data)
       .then((res)=> {console.log(res.data)
           if(res.data.status){
               this.nextPath('/studyList')
           }
           if(!res.data.status){
               alert(res.data.message)
           }
          });

 }

    handleChange= (event)=> {
        event.preventDefault()
   this.setState({[event.target.name]: event.target.value});

 }

    render() {
        return <div className="container" ><div className="card-items">

            <div className="card-patient">
        <div className="block">
            <div className="input-t">
                <div className="top-login">
                <label className="text"><center>ADD PATIENT</center></label>
                </div>
                <div className="content">
                <input type="text" className="form__field" placeholder="Patient Name" name="PatientName" onChange={this. handleChange}></input>


             <input type="text" className="form__field" placeholder="Patient ID " name="PatientID" onChange={this. handleChange}></input>
             <textarea  className="form__field" placeholder="Description " name="Description" onChange={this. handleChange}></textarea>
     
     <input type='file' onChange={this. handleChangeFile} ref={this.fileInput} style={{ display: 'none' }} multiple></input>
     <div>
     <button
  className='upload-btn'
  onClick={() => this.fileInput.current.click()}
>Choose File</button>

       { this.state.ListDicom.length ? (<div className='files'>
            {this.state.ListDicom.length} files added
            </div>) : (null)}
</div>
      </div>
              <div className="hrl"></div>
             <div className="footer-login ">



             <button className='btn-first' onClick={this.handleSubmit}>ADD PATIENT</button>


             </div>

             </div>

            
             <div className="align">
             <div className="create-account">
            
             </div>
           
             </div>
             </div>
             </div>

             </div></div>;

    }
}
export default withRouter(AddPatient);
