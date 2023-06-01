import React from 'react';
import './DefaultPage.css';
import Sidebar from '../../components/common/Sidebar.tsx';
type Props = {}
const SaasPage = (props: Props) => {
    return (
        <><Sidebar /><div className="DashBoard">Teste Tex Page</div></>
    );
};

export default SaasPage;