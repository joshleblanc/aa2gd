import FixedHeightList from "./FixedHeightList";
import { ListItemText, ListItem, ListItemAvatar } from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBattleNet, faSteam, faTwitch, faYoutube, faSkype, faReddit, faFacebook, faTwitter, faSpotify } from '@fortawesome/free-brands-svg-icons';

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
                        case 'youtube': return <Connection href={`https://youtube.com/channel/${c.id}`} name={c.name} icon={faYoutube} />
                        case 'skype': return <Connection href={`skype:${c.id}?userinfo`} name={c.name} icon={faSkype} />
                        case 'reddit': return <Connection href={`https://reddit.com/u/${c.name}`} name={c.name} icon={faReddit} />
                        case 'facebook': return <Connection href={`https://facebook.com/profile?id=${c.id}`} name={c.name} icon={faFacebook} />
                        case 'twitter': return <Connection href={`https://twitter.com/intent/user?user_id=${c.id}`} name={c.name} icon={faTwitter} />
                        case 'spotify': return <Connection href={`https://open.spotify.com/user/horizonshadow`} name={c.name} icon={faSpotify} />
                        default: return <Connection name={c.name} icon={faBattleNet} />
                    }
                })
            }
        </FixedHeightList>
    )
}