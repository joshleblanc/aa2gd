import DrawerItems from './DrawerItems';
import StyledDrawer from './StyledDrawer';
import * as React from "react";

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