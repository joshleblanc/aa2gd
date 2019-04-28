import FixedHeightList from "./FixedHeightList";
import { ListItemText, ListItem, ListItemAvatar } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBattleNet, faSteam, faTwitch } from '@fortawesome/free-brands-svg-icons';
import { DH_CHECK_P_NOT_SAFE_PRIME } from "constants";

const Connection = ({href, icon, name}) => (
    <ListItem button component='a' href={href}>
        <ListItemAvatar>
            <FontAwesomeIcon icon={icon} />
        </ListItemAvatar>
        <ListItemText primary={name} />
    </ListItem>
)
    


export default ({connections}) => {
    return(
        <FixedHeightList height={200} title="Connections">
            {
                connections.map(c => {
                    switch(c.type) {
                        case 'steam': return <Connection href={`http://steamcommunity.com/profiles/${c.id}`} name={c.name} icon={faSteam} />
                        case 'twitch': return <Connection href={`https://www.twitch.tv/${c.name}`} name={c.name} icon={faTwitch} />
                        default: return <Connection name={c.name} icon={faBattleNet} />
                    }
                })
            }
        </FixedHeightList>
    )
}