import FixedHeightList from "./FixedHeightList";
import {ListItemText, ListItem, ListItemAvatar, Icon} from "@material-ui/core";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faBattleNet,
    faSteam,
    faTwitch,
    faYoutube,
    faSkype,
    faReddit,
    faFacebook,
    faTwitter,
    faSpotify,
    faXbox
} from '@fortawesome/free-brands-svg-icons';
import React from "react";

const Connection = ({href, icon, name}) => (
    <ListItem button component='a' href={href}>
        <ListItemAvatar>
            <Icon>
                <FontAwesomeIcon icon={icon}/>
            </Icon>
        </ListItemAvatar>
        <ListItemText primary={name}/>
    </ListItem>
);

export default ({connections}) => {
    return (
        <FixedHeightList height={835} title="Connections">
            {
                connections.map(c => {
                    switch (c.type) {
                        case 'steam':
                            return <Connection href={`http://steamcommunity.com/profiles/${c.id}`} name={c.name}
                                               key={c.type + c.id} icon={faSteam}/>;
                        case 'twitch':
                            return <Connection href={`https://www.twitch.tv/${c.name}`} name={c.name}
                                               key={c.type + c.id} icon={faTwitch}/>;
                        case 'youtube':
                            return <Connection href={`https://youtube.com/channel/${c.id}`} name={c.name}
                                               key={c.type + c.id} icon={faYoutube}/>;
                        case 'skype':
                            return <Connection href={`skype:${c.id}?userinfo`} name={c.name} icon={faSkype}
                                               key={c.type + c.id}/>;
                        case 'reddit':
                            return <Connection href={`https://reddit.com/u/${c.name}`} name={c.name} key={c.type + c.id}
                                               icon={faReddit}/>;
                        case 'facebook':
                            return <Connection href={`https://facebook.com/profile?id=${c.id}`} name={c.name}
                                               key={c.type + c.id} icon={faFacebook}/>;
                        case 'twitter':
                            return <Connection href={`https://twitter.com/intent/user?user_id=${c.id}`} name={c.name}
                                               key={c.type + c.id} icon={faTwitter}/>;
                        case 'spotify':
                            return <Connection href={`https://open.spotify.com/user/${c.id}`} name={c.name}
                                               key={c.type + c.id} icon={faSpotify}/>;
                        case 'xbox':
                            return <Connection name={c.name} key={c.type + c.id} icon={faXbox}/>;
                        default:
                            return <Connection name={c.name} icon={faBattleNet} key={c.type + c.id} />
                    }
                })
            }
        </FixedHeightList>
    )
}