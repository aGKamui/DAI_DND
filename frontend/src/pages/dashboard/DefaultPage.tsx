import React, { useEffect } from 'react';
import './DefaultPage.css';
import Sidebar from '../../components/common/Sidebar.tsx';
import Cookies from 'js-cookie';



type Props = {}
const DefaultPage = (props: Props) => {
    useEffect(() => {
        fetch('http://localhost:8000/api/character/', {
            method: "GET",
            headers: {
                'auth': Cookies.get("Token"),
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
    }).then(response => {
        if (!response.ok) {
            window.location.href = '/login';
        }else{
            return response.json()  
        }
              
      }).then(data => {
        console.log(data)
      });
    });


    return (
        <><Sidebar /><div className="DashBoard">Teste Text - this is known as the default page</div></>

    );
};

export default DefaultPage;