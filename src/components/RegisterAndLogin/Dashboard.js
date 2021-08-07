import React, {useState, useEffect} from "react";
import { Link } from 'react-router-dom';
import { Button, Spin, message } from 'antd';
import { API_URL } from '../Constants';


export default function Dashboard(props) {

    const [welcomeMsg, setWelcomeMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        verifyLogin();
    }, []);

    const onLogout = () => {
        localStorage.clear();
        message.success('You are now logged out!');
        props.history.push('/');
    }

    const verifyLogin = async () => {
        setIsLoading(true);
        const requestOptions = {
            method: 'GET',
            headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
        };
        const url = `${API_URL}/verify-login/`;
        try {
            const results = await fetch(url, requestOptions);
            const response = await results.json();
            console.log("verifyLogin: ", response);
            setIsLoading(false);
            if (response.status === 'success') {
                setWelcomeMsg(response.message);
            } else {
                message.error('Error: User verification failed, please login and try again');
            }
        } catch (err) {
            console.log("Error: ", err);
            setIsLoading(false);
            message.error('Error: Network error while logging in, please try again');
        }
    }

    return (
        <div>
            <div style={{height: "60vh"}} className="flex items-center justify-center -mt-8">
                <div>
                    <Spin size="large" spinning={isLoading}>
                        <div className="flex justify-center">
                            {welcomeMsg ? (
                                <div>
                                    <h4 className="text-2xl font-medium">{welcomeMsg}</h4>
                                    <div className="mt-6 px-4">
                                        <Button 
                                            onClick={onLogout} 
                                            type="primary" 
                                            shape="round" 
                                            size="large" 
                                            block>Logout</Button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h4 className="text-2xl font-medium text-center">
                                        User verification failed.<br/>
                                        Click <Link to='/'>here</Link> to login
                                    </h4>
                                </div>
                            )}
                        </div>
                    </Spin>
                </div>
            </div>
        </div>
    )
}
