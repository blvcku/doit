import PerformerIcon from '../../../../../../assets/icons/performer.svg';
import PlusIcon from '../../../../../../assets/icons/plus-green.svg';
import CloseIcon from '../../../../../../assets/icons/close-grey.svg';
import { Container, CloseButton, Wrapper } from './SelectPerformer.styles';
import {
    MemberContainer,
    MemberButton,
} from '../../members-list/Members.styles';

const SelectPerformer = ({
    members,
    setSelectedPerformer,
    setIsSelectingPerformer,
}) => {
    const handleSelectPerformer = (e, performer) => {
        e.preventDefault();
        setSelectedPerformer(performer);
        setIsSelectingPerformer(false);
    };

    const handleCloseSelecting = (e) => {
        e.preventDefault();
        setIsSelectingPerformer(false);
    };

    return (
        <Container>
            <CloseButton onClick={handleCloseSelecting} type="button">
                <img
                    src={CloseIcon}
                    alt="close the menu with option of choosing the performer of the task"
                />
            </CloseButton>
            <img src={PerformerIcon} alt="" />
            <h2>SET TASK PERFORMER</h2>
            <Wrapper>
                {members.map(({ photoURL, displayName, uid }) => (
                    <MemberContainer key={uid}>
                        <div>
                            <img src={photoURL} alt={displayName} />
                            <p>{displayName}</p>
                        </div>
                        <MemberButton
                            onClick={(e) =>
                                handleSelectPerformer(e, {
                                    photoURL,
                                    displayName,
                                    uid,
                                })
                            }
                            type="button"
                        >
                            <img src={PlusIcon} alt="Assign to task" />
                        </MemberButton>
                    </MemberContainer>
                ))}
            </Wrapper>
        </Container>
    );
};

export default SelectPerformer;
