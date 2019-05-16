import Cookies from 'js-cookie';
import { GET_DRAWER_STATE } from '../hooks/useDrawer';
import {InMemoryCache} from "apollo-cache-inmemory";

interface Context {
    cache: InMemoryCache
}

interface Args {
    token: string
}

interface Obj {

}

export default {
    Mutation: {
        setToken: async (_obj: Obj, { token }: Args, { cache }: Context ) => {
            console.log(token);
            cache.writeData({ data: { token } })
        },
        logout: async (_obj: Obj, _context: Args, { cache }: Context) => {
            cache.writeData({ data: { token: null }});
            Cookies.remove('token');
        },
        toggleDrawer: async (_obj: Obj , _args: Args, { cache }: Context) => {
            const resp: { drawerOpen: boolean } | null = cache.readQuery({ query: GET_DRAWER_STATE });
            cache.writeData({
                data: {
                    drawerOpen: !resp!.drawerOpen
                }
            });
        }
    }
}