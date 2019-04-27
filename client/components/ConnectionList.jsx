import FixedHeightList from "./FixedHeightList";
import { ListItemText, ListItem, ListItemAvatar } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBattleNet, faSteam, faTwitch } from '@fortawesome/free-brands-svg-icons';

export default ({connections}) => {
    const icon = type => {
        switch(type) {
            case 'steam': return faSteam;
            case 'twitch': return faTwitch;
            default: return faBattleNet;
        }
    }
    return(
        <FixedHeightList height={200} title="Connections">
            {
                connections.map(c => {
                    return(
                        <ListItem key={c.id}>
                            <ListItemAvatar>
                                <FontAwesomeIcon icon={icon(c.type)} />
                            </ListItemAvatar>
                            <ListItemText primary={c.name} />
                        </ListItem>
                    )
                })
            }
        </FixedHeightList>
    )
}