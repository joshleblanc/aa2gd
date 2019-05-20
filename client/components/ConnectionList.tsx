import FixedHeightList from "./FixedHeightList";
import {ListItemText, ListItem, ListItemAvatar, Icon} from "@material-ui/core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBattleNet, faSteam, faTwitch, faYoutube, faSkype, faReddit, faFacebook, faTwitter, faSpotify, faXbox,
    IconDefinition } from '@fortawesome/free-brands-svg-icons';
import React from "react";
import IConnection from "../types/Connection";

interface ConnectionProps {
    href?: string,
    icon: IconDefinition,
    name: string
}

interface Props {
    connections: Array<IConnection>
}

const Connection = ({href, icon, name}:ConnectionProps) => (
    <ListItem button component='a' href={href}>
        <ListItemAvatar>
            <Icon>
                <FontAwesomeIcon icon={icon} />
            </Icon>
        </ListItemAvatar>
        <ListItemText primary={name} />
    </ListItem>
);

export default ({connections}:Props) => {
    return(
        <FixedHeightList height={835} title="Connections">
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
                        case 'spotify': return <Connection href={`https://open.spotify.com/user/${c.id}`} name={c.name} icon={faSpotify} />
                        case 'xbox': return <Connection name={c.name} icon={faXbox} />
                        default: return <Connection name={c.name} icon={faBattleNet} />
                    }
                })
            }
        </FixedHeightList>
    )
}