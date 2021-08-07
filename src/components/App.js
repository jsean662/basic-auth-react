import React, { useEffect, useState } from "react"
import Routes from './Routes';
import Toolbar from './Toolbar/Toolbar'
import { message, Spin } from 'antd';
import { API_URL } from './Constants';
import Footer from './Footer/Footer'

export default function App(props) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      wakeUp();
  }, []);


  const wakeUp = async () => {
      const requestOptions = {
          method: 'GET',
      };
      const url = `${API_URL}/wake-up/`;
      try {
          const response = await fetch(url, requestOptions);
          setIsLoading(false);
          if (response.status !== 200) {
              message.error("Error: Network error while connecting to the server, please try again")
          }
      } catch (err) {
          console.log("Error: ", err);
          setIsLoading(false);
          message.error('Error: Network error while connecting to the server, please try again');
      }
  }


  return (
      <div className="bg-gray-50 min-h-screen">
        <Spin size="large" spinning={isLoading}>
          <Toolbar />
          <Routes />
          <Footer />
        </Spin>
      </div>
  );
}
