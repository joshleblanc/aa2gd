import DrawerItems from './DrawerItems';
import useDrawer from '../../hooks/useDrawer';
import StyledDrawer from './StyledDrawer';

export default () => {
    const { drawerOpen, toggleDrawer } = useDrawer();
    return(
        <StyledDrawer
            variant="temporary"
            ModalProps={{
                keepMounted: true
            }}
            open={drawerOpen}
            onClose={toggleDrawer}
        >
            <DrawerItems />
        </StyledDrawer>
    )
}