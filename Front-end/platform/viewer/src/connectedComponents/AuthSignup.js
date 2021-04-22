import React, { Component } from 'react';
import { withRouter  } from "react-router-dom";
import axios from 'axios';
import './auth.css'

class AuthSignup extends Component {

   nextPath(path) {
    this.props.history.push(path);
  }

    state = {

        nom : ''  ,
        prenom : '',
          email : '',
          password:'',
        };



  handleSubmit= (event)=> {
         event.preventDefault()
         const data=this.state;
         console.log('data :', data);
         axios.post('http://localhost:5000/users/register',data)
        .then((res)=> {console.log(res.data)
            if(res.data=='added'){
                this.nextPath('/')
            }
           });

  }

     handleChange= (event)=> {
         event.preventDefault()
    this.setState({[event.target.name]: event.target.value});

  }


    render() {
        return <div className="container" ><div className="card-items">

            <div className="card-signup">
        <div className="block">
            <div className="input-t">
                <div className="top-login">
                <label className="text"><center>Sign Up</center></label>
                </div>
                <div className="content">
                <input type="text" className="form__field" placeholder="First Name" name="nom" onChange={this. handleChange}></input>
                <input type="text" className="form__field" placeholder="Last Name" name= "prenom" onChange={this. handleChange}></input>
                <input type="email" className="form__field" placeholder="Email"name="email" onChange={this. handleChange}></input>

                <input type="date" className="form__field" placeholder="Date"  ></input>


             <input type="password" className="form__field" placeholder="Password"name="password" onChange={this. handleChange}></input>
              <input type="password" className="form__field" placeholder="Confirm Password"></input>
             </div>
             <div className="footer-login ">

      
             <button className='btn-first' onClick={this.handleSubmit} >Sign up</button>


             </div>

             </div>

             <div className="hrl"></div>
             <div className="align">
             <div className="create-account">
             <span onClick={() => this.nextPath('/')}>Log In</span>

             </div>
             <div className="create-account">

             </div>
             </div>
             </div>
             </div>

             </div></div>;

    }
}
export default withRouter(AuthSignup);
