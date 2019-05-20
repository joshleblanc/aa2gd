import useCurrentUser from "./useCurrentUser";

export default () => {
    const { data, error, loading } = useCurrentUser();
    if(!error && !loading) {
        if(data.currentUser) {
            return data.currentUser.servers;
        } else {
            return [];
        }
    }
}