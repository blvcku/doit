import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

import { Button } from './Navbar.styles';

const NotificationsButton = (props) => (
    <Button {...props} >
        <FontAwesomeIcon size='2x' icon={faBell} />
    </Button>
)

export default NotificationsButton;