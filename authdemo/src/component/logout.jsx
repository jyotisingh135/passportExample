import React,{Component} from 'react';
class Logout extends Component{
    constructor(){
        super();

    }
    componentDidMount(){
        fetch('http://localhost:3001',{
            method:'DELETE',
            body:JSON.stringify({})
        }).then((res)=>{

        }).catch();
    }
    render(){
        return(
            <div>
                Logout
            </div>
        );
    }
}
export default Logout