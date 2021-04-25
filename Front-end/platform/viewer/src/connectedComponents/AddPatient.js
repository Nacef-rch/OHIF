/* eslint-disable react/react-in-jsx-scope */
import React, { Component  } from 'react';
import { withRouter  } from "react-router-dom";
import axios from 'axios';
import './auth.css'
import { array } from 'prop-types';

class AddPatient extends Component {

   nextPath(path) {
    this.props.history.push(path);
  }



   fileInput=React.createRef();

  state = {
      id:'',
      nom : '',
      description:'',
      imageList:[],

      
    };

 getBase64 = file => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
       
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };
 
handleChangeFile =(e) =>{

  this.setState(null);
    console.log(e.target.files.length)
   for (let file of e.target.files) 
    {

    this.getBase64(file)
      .then(result => {
        file["base64"] = result;
        console.log("File Is", file);
        this.setState( prevState => ({
     imageList: [...prevState.imageList,  {imageUrl:result}]
 }));
    console.log(this.state.imageList)
      })
      .catch(err => {
        console.log(err);
      });
      
    }
     
   /* this.setState({
      imageList: e.target.files
    });*/

    }
  

    handleSubmit= (event)=> {
        event.preventDefault()
        const data=this.state;
        console.log('data :', data);
        axios.post('http://localhost:5000/patients/addPatient',data)
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
                     <input type="text" className="form__field" placeholder="Patient ID " name="id" onChange={this. handleChange}></input>
                <input type="text" className="form__field" placeholder="Patient Name" name="nom" onChange={this. handleChange}></input>


            
             <textarea  className="form__field" placeholder="Description " name="description" onChange={this. handleChange}></textarea>
     
     <input type='file' onChange={this. handleChangeFile} ref={this.fileInput} style={{ display: 'none' }} multiple></input>
     <div>
     <button
  className='upload-btn'
  onClick={() => this.fileInput.current.click()}
>Choose File</button>

       {this.state.imageList.length ? (<div className='files'>
            {this.state.imageList.length} files added
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
