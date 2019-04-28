import FixedHeightList from "./FixedHeightList";
import { ListItemText, ListItem, ListItemAvatar } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBattleNet, faSteam, faTwitch, faYoutube } from '@fortawesome/free-brands-svg-icons';

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
                        case 'youtube': return <Connection href={`https://youtube.com/user/${c.name}`} name={c.name} icon={faYoutube} />
                        default: return <Connection name={c.name} icon={faBattleNet} />
                    }
                })
            }
        </FixedHeightList>
    )
}