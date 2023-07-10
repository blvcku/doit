import PerformerIcon from '../../../../../assets/icons/performer.svg';
import CloseIcon from '../../../../../assets/icons/close-grey.svg';
import { ProjectTaskPerformerSelectContainer, ProjectTaskPerformerSelectCloseButton, ProjectTaskPerfomerSelectHeading, ProjectTaskPerformerSelectCloseButtonIcon, ProjectTaskPerformerSelectIcon, ProjectTaskPerformerSelectMembersList } from './ProjectTaskPerfomerSelect.styles';
import Member from '../../../components/member/Member'

const ProjectTaskPerformerSelect = ({
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
        <ProjectTaskPerformerSelectContainer>
            <ProjectTaskPerformerSelectCloseButton onClick={handleCloseSelecting} type="button">
                <ProjectTaskPerformerSelectCloseButtonIcon
                    src={CloseIcon}
                    alt="close the menu with option of choosing the performer of the task"
                />
            </ProjectTaskPerformerSelectCloseButton>
            <ProjectTaskPerformerSelectIcon src={PerformerIcon} alt="" />
            <ProjectTaskPerfomerSelectHeading>SET TASK PERFORMER</ProjectTaskPerfomerSelectHeading>
            <ProjectTaskPerformerSelectMembersList>
                {members.map(({ photoURL, displayName, uid }) => (
                    <Member key={uid} uid={uid} displayName={displayName} photoURL={photoURL} buttonType='add' buttonClickHandler={(e) =>
                        handleSelectPerformer(e, {
                            photoURL,
                            displayName,
                            uid,
                        })}/>
                ))}
            </ProjectTaskPerformerSelectMembersList>
        </ProjectTaskPerformerSelectContainer>
    );
};

export default ProjectTaskPerformerSelect;
