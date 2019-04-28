import DrawerItems from './DrawerItems';
import StyledDrawer from './StyledDrawer';

export default ({host}) => {
    return(
        <StyledDrawer
            variant="permanent"
            open
        >
            <DrawerItems host={host} />
        </StyledDrawer>
    )
}