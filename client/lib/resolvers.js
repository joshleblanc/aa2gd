import Cookies from 'js-cookie';
import { GET_DRAWER_STATE } from '../hooks/useDrawer';

export default {
    Mutation: {
        setToken: async (_obj, { token }, { cache }) => {
            cache.writeData({ data: { token } })
        },
        logout: async (_obj, _context, { cache }) => {
            cache.writeData({ data: { token: null }});
            Cookies.remove('token');
        },
        toggleDrawer: async (_obj , _args, { cache }) => {
            const resp = cache.readQuery({ query: GET_DRAWER_STATE });
            cache.writeData({
                data: {
                    drawerOpen: !resp.drawerOpen
                }
            });
        }
    }
}