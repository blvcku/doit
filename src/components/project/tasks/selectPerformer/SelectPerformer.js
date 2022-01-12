import PersonIcon from '../../../../images/project/tasks/person.svg';
import PlusIcon from '../../../../images/project/plus.svg';
import CloseIcon from '../../../../images/x.svg';

import { Container, CloseButton, Wrapper } from "./SelectPerformer.styles";
import { MemberContainer, MemberButton } from "../../membersList/Members.styles";

const SelectPerformer = ({members, setSelectedPerformer, setIsSelectingPerformer}) => {

    const handleSelectPerformer = (e, performer) => {
        e.preventDefault();
        setSelectedPerformer(performer);
        setIsSelectingPerformer(false);
    }

    const handleCloseSelecting = e => {
        e.preventDefault();
        setIsSelectingPerformer(false);
    }

    return(
        <Container>
            <CloseButton onClick={handleCloseSelecting} type='button'>
                <img src={CloseIcon} alt='Close' />
            </CloseButton>
            <img src={PersonIcon} alt='Person' />
            <h2>SET TASK PERFORMER</h2>
                <Wrapper>
                    {members.map(({photoURL, displayName, uid}) => (
                        <MemberContainer key={uid}>
                            <div>
                                <img src={photoURL} alt={displayName} />
                                <p>{displayName}</p>
                            </div>
                            <MemberButton onClick={e => handleSelectPerformer(e, {photoURL, displayName, uid})} type='button'>
                                <img src={PlusIcon} alt='Assign' />
                            </MemberButton>
                        </MemberContainer>
                    ))}
                </Wrapper>
        </Container>
    )
}

export default SelectPerformer;