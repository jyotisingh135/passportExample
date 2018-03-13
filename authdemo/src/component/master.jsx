import React,{Component} from 'react';
import Register from './register';
import Login from './login';
import Home from './home';
import './css/customcss.css';
import './css/bootstrap.css';
import Logout from './logout';
import {BrowserRouter as Router,Route,NavLink} from 'react-router-dom';
class Master extends Component{
    constructor(){
        super();
        this.state={
            token:''
        }


    }
    render(){
        return(
            <Router>
                <section>
                    <Links/>
                    <div className='bg-primary h-50'>
                    </div>

                         <Route exact path='/home' component={Home}/>
                        <Route exact path='/home/login' component={Login}/>
                        <Route exact path='/home/register' component={Register}/>

                    </section>
                        </Router>


        );
    }
}
 const Links=()=>{
        return(
            <section className='btn-group-lg'>
                <NavLink className='btn btn-primary' exact activeClassName='active' to='/home'>Home</NavLink>
                <NavLink className='btn btn-primary' exact activeClassName='active' to='/home/login'>Login</NavLink>
                <NavLink  className='btn btn-primary' exact  activeClassName='active' to='/home/register'>Register</NavLink>


            </section>
        );

 }
export default Master;