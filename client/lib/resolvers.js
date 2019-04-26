import Cookies from 'js-cookie';
export default {
    Mutation: {
        setToken: async (_, { token }, { cache }) => {
            console.log(token);
            cache.writeData({ data: { token } })
        },
        logout: async (_, vars, { cache }) => {
            cache.writeData({ data: { token: null }});
            Cookies.remove('token');
        }
    }
}