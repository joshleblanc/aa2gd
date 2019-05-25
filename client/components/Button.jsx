import React from "react";
import classnames from 'classnames';

export default ({variant, component, className, ...props}) => {
    const classNames = classnames({
        [`is-${variant}`]: !!variant,
    }, className, 'nes-btn');
    return React.createElement(component || 'button', {
        className: classNames,
        ...props
    });
}