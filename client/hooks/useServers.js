import useCurrentUser from "./useCurrentUser";

export default () => {
    const { data, error, loading } = useCurrentUser();
    if(!error && !loading) {
        return data.currentUser.servers;
    }
}