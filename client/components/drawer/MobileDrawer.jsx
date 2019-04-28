import DrawerItems from './DrawerItems';
import useDrawer from '../../hooks/useDrawer';
import StyledDrawer from './StyledDrawer';

export default ({host}) => {
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
            <DrawerItems host={host} />
        </StyledDrawer>
    )
}