import Cookies from 'js-cookie';
import { GET_DRAWER_STATE } from '../components/drawer/MobileDrawer';

export default {
    Mutation: {
        setToken: async (_, { token }, { cache }) => {
            console.log(token);
            cache.writeData({ data: { token } })
        },
        logout: async (_, vars, { cache }) => {
            cache.writeData({ data: { token: null }});
            Cookies.remove('token');
        },
        toggleDrawer: async (a,b, { cache }) => {
            const { drawerOpen } = cache.readQuery({ query: GET_DRAWER_STATE });
            cache.writeData({
                data: {
                    drawerOpen: !drawerOpen
                }
            });
        }
    }
}