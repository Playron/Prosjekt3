import React, {useState} from 'react'
import axios from 'axios';
import './../styles/login.css'


export default function LoginScreen() {
    const defaultUserCred = {
        username: null,
        password:  null
    };
    const [userCred,setUserCred] = useState(defaultUserCred);
    const handleChange = (e : any) : void => { //  Updates user creds when user writes in field
        setUserCred({...userCred,[e.target.name]: e.target.value})
    }
    /* Checks if user is registered in db*/
    const checkUserCred = async () : Promise<boolean> => { 
        let isRight = false;
        await fetch('http://it2810-56.idi.ntnu.no:3000/users/' + userCred.username)
        .then((response) => response.json())
        .then((user_json) =>{
            isRight = user_json[0].password === userCred.password;})
        .catch((err)=> console.log(err))
        return isRight; 
    }
    /* Adds user to db*/
    const handleReg = () : void =>{
        if(userCred === defaultUserCred){alert('Fields cannot be empty');return}
        axios.post('http://it2810-56.idi.ntnu.no:3000/users/add', userCred)
        alert(userCred.username + ' is now added to database')
    }
    /* Called when user clicks login-in button, sets current user in sessionStorage if user is registered i db*/
    const  handleLogin = () : void  => {
        if(userCred === defaultUserCred){alert('Fields cannot be empty');return}
        checkUserCred().then((res)=>{
            console.log('Her:', res);
            if(res){
                sessionStorage.setItem('username', userCred.username);
                window.open('Search','_self') // Redirects to SearchScreen 
            }
            else alert('Wrong username/password combination');})
    }
    return(
        <div className="loginscreen">
            <div className="loginbox">
                <input className="loginfield" type="text" id="username" name="username" placeholder={'Username'} onChange={handleChange} onKeyPress={(e)=>{if(e.key==='Enter'){handleLogin()}}}/><br/>
                <input className="loginfield" type="password" id="password" name="password" placeholder={'Password'} onChange={handleChange} onKeyPress={(e)=>{if(e.key==='Enter'){handleLogin()}}}/><br/>
                <input className="loginbutton" type="submit" id='submit' value ='Log in' onClick={handleLogin}/><br/>
                <input className="loginbutton" type='submit' value = 'Register user' onClick={handleReg}/>
            </div>
        </div>
    )
}