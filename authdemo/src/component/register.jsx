import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
class Register extends Component{
    constructor(){
        super();
        this.handleRegister=this.handleRegister.bind(this);
        this.clear=this.clear.bind(this);
        this.state={
            data:[]
        }
    }
    clear(){
        //document.getElementById('name').removeAttribute('value');
    }
    handleRegister(e){
        e.preventDefault();
        console.log('called');
        var name=document.getElementById('name').value;
        var city=document.getElementById('city').value;
        var username=document.getElementById('username').value;
        var password=document.getElementById('password').value;
        var values={name:name,
            city:city,
            username:username,
            password:password};
        fetch('http://localhost:3001/home/register',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(values),

        }).then((res)=>{

        }).catch();
        this.props.history.push('/home/login');
    }
    render(){
        return(
            <div>
                <div className='container-fluid w-50 bg-light'>
                    <div className='jumbotron'>
                        <h2 align='center'>REGISTER</h2>
                    </div>
                    <div className='conatiner bg-transparent'>
                        <form>
                            <input type='text' id='name' className='form-control' placeholder='Name'/>
                            <br/>
                            <input type='text' id='city' className='form-control' placeholder='city'/>
                            <br/>
                            <input type='text' id='username' className='form-control' placeholder='Username'/>
                            <br/>
                            <input type='password' id='password' className='form-control' placeholder='Password'/>
                            <br/>
                            <input type='submit' id='register' className='btn btn-info float-right' onClick={this.handleRegister} value='Register'/>
                            <br/>
                            <br/>
                            <br/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
export default Register;