import React from 'react';
import './DefaultPage.css';
import Sidebar from '../../components/common/Sidebar.tsx';


type Props = {}
const DefaultPage = (props: Props) => {
    return (
        <><Sidebar /><div className="DashBoard">Teste Text - this is known as the default page</div></>
        
    );
};

export default DefaultPage;