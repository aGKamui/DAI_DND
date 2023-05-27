// assets
import { IconUser, IconUserMinus, IconUserPlus, IconUsers, IconBrandCashapp, IconCashBanknote, IconCashOff, IconWallet, IconFileDescription, IconFileOff, IconFileSettings, IconFileStack } from '@tabler/icons';

// constant
const icons = {
    IconUser,
    IconUserMinus,
    IconUserPlus,
    IconUsers,
    IconBrandCashapp,
    IconCashBanknote, 
    IconCashOff,
    IconWallet,
    IconFileDescription,
    IconFileOff,
    IconFileDescription,
    IconFileSettings,
    IconFileStack
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
    id: 'utilities',
    title: 'Ferramentas',
    type: 'group',
    children: [
        {
            id: 'util-color',
            title: 'As minhas campanhas',
            type: 'collapse',
            url: '/utils/util-color',
            icon: icons.IconFileStack,
            children: [               
                {
                    id: 'material-icons',
                    title: 'Continuar Campanha',
                    type: 'item',
                    url: '/icons/material-icons',
                    icon: icons.IconFileDescription,
                    breadcrumbs: false
                },
                {
                    id: 'tabler-icons',
                    title: 'Criar Campanha',
                    type: 'item',
                    url: '/icons/tabler-icons',
                    icon: icons.IconFileSettings,
                    breadcrumbs: false
                },    
                {
                    id: 'tabler-icons',
                    title: 'Eliminar Campanhas',
                    type: 'item',
                    url: '/icons/tabler-icons',
                    icon: icons.IconFileOff,
                    breadcrumbs: false
                }
            ]
        },   
        {
            id: 'util-color',
            title: 'As minhas personagens',
            type: 'collapse',
            url: '/utils/util-color',
            icon: icons.IconUsers,
            children: [
                {
                    id: 'material-icons',
                    title: 'Ver Personagens',
                    type: 'item',
                    url: '/icons/material-icons',
                    icon: icons.IconUser,
                    breadcrumbs: false
                },
                {
                    id: 'tabler-icons',
                    title: 'Criar Personagem',
                    type: 'item',
                    url: '/icons/tabler-icons',
                    icon: icons.IconUserPlus,
                    breadcrumbs: false
                },                
                {
                    id: 'material-icons',
                    title: 'Apagar Personagem',
                    type: 'item',
                    url: '/icons/material-icons',
                    icon: icons.IconUserMinus,
                    breadcrumbs: false
                }
            ]
        },       
        {
            id: 'icons',
            title: 'Subscrição',
            type: 'collapse',
            icon: icons.IconBrandCashapp,
            children: [
                {
                    id: 'tabler-icons',
                    title: 'Renovar Subscrição',
                    type: 'item',
                    url: '/icons/tabler-icons',
                    icon: icons.IconCashBanknote,
                    breadcrumbs: false
                },
                {
                    id: 'material-icons',
                    title: 'Cancelar Subscrição',
                    type: 'item',
                    url: '/icons/material-icons',
                    icon: icons.IconCashOff,
                    breadcrumbs: false
                }
                ,
                {
                    id: 'material-icons',
                    title: 'Métodos de Pagamento',
                    type: 'item',
                    url: '/icons/material-icons',
                    icon: icons.IconWallet,
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default utilities;
