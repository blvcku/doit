import useConfirmBox from '../../contexts/confirm-box-context/useConfirmBox';
import {
    ConfirmBoxButton,
    ConfirmBoxContainer,
    ConfirmBoxTitle,
    ConfirmBoxWrapper,
} from './ConfirmBox.styles';

const ConfirmBox = () => {
    const { confirmInfo, setConfirmInfo } = useConfirmBox();

    const handleDecline = () => {
        setConfirmInfo(null);
    };

    const handleAccept = () => {
        confirmInfo.action();
        setConfirmInfo(null);
    };

    return (
        <>
            {confirmInfo && (
                <ConfirmBoxWrapper>
                    <ConfirmBoxContainer role="alertdialog">
                        <ConfirmBoxTitle>
                            Are you sure you want to {confirmInfo.message}?
                        </ConfirmBoxTitle>
                        <ConfirmBoxButton onClick={handleDecline} type="button">
                            No
                        </ConfirmBoxButton>
                        <ConfirmBoxButton onClick={handleAccept} type="button">
                            Yes
                        </ConfirmBoxButton>
                    </ConfirmBoxContainer>
                </ConfirmBoxWrapper>
            )}
        </>
    );
};

export default ConfirmBox;
