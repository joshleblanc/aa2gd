import { List, ListItemText, ListItem, ListItemAvatar, Typography, makeStyles, Avatar } from '@material-ui/core';
import FixedHeightList from './FixedHeightList';

export default ({ servers }) => {
    return (
        <FixedHeightList hieght={400} title="Servers">
            { 
                servers.map(s => {
                    return (
                        <ListItem key={s.id}>
                            <ListItemAvatar>
                                {
                                    s.icon 
                                        ? <Avatar src={s.iconUrl} /> 
                                        : <Avatar>{s.name.split(' ').map(c => c[0])}</Avatar>
                                }
                            </ListItemAvatar>
                            <ListItemText primary={s.name} />
                        </ListItem>
                    )
                })
            }
        </FixedHeightList>

    )
}