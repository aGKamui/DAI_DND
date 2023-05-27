// assets
import { IconKey, IconLogin, IconHomeUp} from '@tabler/icons';

// constant
const icons = {
    IconKey,
    IconLogin,
    IconHomeUp
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
    id: 'pages',
    type: 'group',
    children: [
        {
            id: 'authentication',
            title: 'Autenticação',
            type: 'collapse',
            icon: icons.IconKey,

            children: [
                {
                    id: 'login3',
                    title: 'Login',
                    type: 'item',
                    url: '/pages/login/login3',
                    icon: icons.IconLogin, 
                    target: true
                },
                {
                    id: 'register3',
                    title: 'Register',
                    type: 'item',
                    url: '/pages/register/register3',
                    icon: icons.IconHomeUp, 
                    target: true
                }
            ]
        }
    ]
};

export default pages;
