import DrawerItems from './DrawerItems';
import StyledDrawer from './StyledDrawer';

export default () => {
    return(
        <StyledDrawer
            variant="permanent"
            open
        >
            <DrawerItems />
        </StyledDrawer>
    )
}