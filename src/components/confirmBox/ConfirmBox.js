import useConfirmBox from '../../hooks/useConfirmBox';

import { Container } from './ConfirmBox.styles';
import { Box } from './ConfirmBox.styles';

const ConfirmBox = () => {

    const { confirmInfo, setConfirmInfo } = useConfirmBox(); 

    const handleDecline = () => {
        setConfirmInfo(null);
    }

    const handleAccept = () => {
        confirmInfo.action();
        setConfirmInfo(null);
    }

    return(
        <>
            {confirmInfo && (
                <Container>
                    <Box role='alertdialog'>
                        <p>Are you sure you want to {confirmInfo.message}?</p>
                        <button aria-label='decline' onClick={handleDecline} type='button'>No</button>
                        <button aria-label='accept' onClick={handleAccept} type='button'>Yes</button>
                    </Box>
                </Container>
            )}
        </>
    )
}

export default ConfirmBox;