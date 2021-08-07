import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, message } from 'antd';
import { API_URL } from '../Constants';


export default function Login(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    

    const onChangeUsername = (e) => {
        // TODO: Add validations
        setUsername(e.target.value);
    }
    
    const onChangePassword = (e) => {
        // TODO: Add validations
        setPassword(e.target.value);
    }

    const onLogin = async () => {
        // TODO: Add check for empty values
        setIsLoading(true);
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            })
        };
        const url = `${API_URL}/login/`;
        try {
            const results = await fetch(url, requestOptions);
            const response = await results.json();
            if (response.status === 'success') {
                message.success(response.message);
                localStorage.setItem("token", response.token);
                props.history.push('/dashboard');
            } else {
                setIsLoading(false);
                setErrorMsg(response.message)
            }
        } catch (err) {
            console.log("Error: ", err);
            // message.error('Error: Network error while logging in, please try again');
            setIsLoading(false);
            setErrorMsg("Error: Network error while logging in, please try again")
        }
    }


    return (
        <div>
            <div style={{height: "60vh"}} className="flex items-center justify-center">
                <div>
                    <div className="flex justify-center">
                        <div>
                            <h4 className="text-xl font-medium text-center">Log in to your account</h4>
                            {errorMsg ? (
                                <div className="flex justify-center my-2">
                                    <span className="bg-red-500 text-white px-3 py-1 rounded-lg">{errorMsg}</span>
                                </div>
                            ) : null}
                        </div>
                    </div>

                    <div className="border shadow bg-white w-full md:w-96 px-6 py-4 my-2 rounded-lg">
                        <div>
                            <div>
                                <p className="tracking-tighter mb-1">Username</p>
                            </div>
                            <div className="w-full">
                                <Input 
                                    size="large" 
                                    // placeholder="Username" 
                                    style={{borderRadius: "12px"}}
                                    name="username"
                                    value={username}
                                    autoFocus
                                    onChange={onChangeUsername}/>
                            </div>
                        </div>

                        <div className="mt-3">
                            <div>
                                <p className="tracking-tighter mb-1">Password</p>
                            </div>
                            <div className="w-full">
                                <Input.Password 
                                    size="large" 
                                    // placeholder="Username" 
                                    style={{borderRadius: "12px"}}
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}/>
                            </div>
                        </div>

                        <div className="mt-6 md:px-16">
                            <Button 
                                onClick={onLogin} 
                                type="primary" 
                                shape="round" 
                                size="large" 
                                loading={isLoading}
                                block>Log In</Button>
                        </div>
                    </div>

                    <div className="flex justify-center my-2">
                        <span className="bg-blue-100 px-4 py-2 rounded-b-lg">
                            New to BasicAuth? click <Link to='/register'>here</Link> to sign up
                        </span>
                    </div>

                </div>
            </div>
        </div>
    )
}
