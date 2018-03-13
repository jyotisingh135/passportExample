import React,{Component} from 'react';
class Home extends Component{
    constructor(){
        super();
        this.handlelogout=this.handlelogout.bind(this);
    }
    componentWillMount(){
        var user=sessionStorage.getItem('user');
        console.log(user);
         if(user==='null'){
           this.props.history.push('/home/login');
         }
    }
    handlelogout(){
            sessionStorage.setItem('user',null);
            console.log(sessionStorage.getItem('user'));
            this.props.history.push('/home/login');
    }
    render(){
        return(
            <div>
                Home
                <button onClick={this.handlelogout} className='btn btn-primary'>Logout</button>
            </div>
        );
    }
}
export default Home;