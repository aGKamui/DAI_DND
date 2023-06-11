import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';


function Logout() {

useEffect(() => {
    Cookies.remove('Token')
    window.location.href = '/login';
}, []);

}

export default Logout;