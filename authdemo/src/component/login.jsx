import React,{Component} from 'react';
import './css/customcss.css';
class Login extends Component{
    constructor(){
        super();
        this.state={
            token:''
        }
        this.handleLogin=this.handleLogin.bind(this);
        this.handlegmaillogin=this.handlegmaillogin.bind(this);
    }
    handlegmaillogin(){
        sessionStorage.setItem('user','google');
    }
    handleLogin(e){
        e.preventDefault();
        var username=document.getElementById('username').value;
        var password=document.getElementById('password').value;
        var values={username:username,password:password};
        if(e.target.id==='login'){
            fetch('http://localhost:3001/home/login',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(values)
            }).then((response)=>{
                console.log(response.data);
                response.json().then((res)=>{
                    console.log(res.msg);
                    if(res.msg==='Success'){
                        sessionStorage.setItem('user',username);
                        this.props.history.push('/home');
                    }
                    else {
                        alert('username or password is incorrect');
                    }
                })

                //console.log('home');


                // alert('username or password invalid');


            }).catch();
        }

    }
    render(){
        return(
            <div className='container-fluid w-25 bg-light'>
                <div className='jumbotron'>
                    <h2 align='center'>LOGIN</h2>
                </div>
                <div className='conatiner bg-transparent'>
                <form>
                    <input type='text' id='username' className='form-control' placeholder='UserName'/>
                    <br/>
                    <input type='password' id='password' className='form-control' placeholder='Password'/>
                    <br/>
                    <section className='form-inline'>
                    <input type='submit' id='login' onClick={this.handleLogin} className='btn btn-info float-right' value='Login'/>
                        <a href="http://localhost:3001/auth/google" className='btn btn-primary float-right' onClick={this.handlegmaillogin}>Login with google</a>
                    </section>
                    <br/>
                    <br/>
                </form>
                </div>
            </div>
        );
    }
}
export default Login;