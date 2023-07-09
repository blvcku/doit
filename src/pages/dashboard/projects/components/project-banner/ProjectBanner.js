import EditIcon from '../../../../../assets/icons/edit-white.svg';
import ChangePhotoIcon from '../../../../../assets/icons/change-photo.svg';
import SubmitIcon from '../../../../../assets/icons/submit.svg';
import { storage, db, functions } from '../../../../../services/firebase';
import useError from '../../../../../contexts/error-context/useError';
import {
    ProjectBannerContainer,
    ProjectBannerTitle,
    ProjectBannerDescription,
    ProjectBannerButton,
    ProjectBannerLabel,
    ProjectBannerFileInput,
    ProjectBannerButtonImage,
    ProjectBannerContentContainer,
    ProjectBannerTextContainer,
    ProjectBannerButtonsContainer,
} from './ProjectBanner.styles';

const ProjectBanner = ({
    title,
    description,
    isOwner,
    isEditing,
    turnOnEdit,
    titleRef,
    id,
    background,
}) => {
    const { dispatchError } = useError();

    const handleChangeImage = (e) => {
        e.preventDefault();
        dispatchError({ type: 'reset' });
        const file = e.target.files[0];
        if (!file) return;
        if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
            return dispatchError({ type: 'update/wrong-image-type' });
        }
        const changeProjectPhoto =
            functions.httpsCallable('changeProjectPhoto');
        const reader = new FileReader();
        reader.onloadend = async (e) => {
            try {
                await changeProjectPhoto({
                    id: id,
                    file: e.target.result,
                    filetype: file.type,
                });
                const url = await storage
                    .ref(`projects/${id}/banner`)
                    .getDownloadURL();
                await db.collection('projects').doc(id).update({
                    photoURL: url,
                });
            } catch (error) {
                return dispatchError({ type: 'projects/change-image-failed' });
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <ProjectBannerContainer background={background}>
            <ProjectBannerContentContainer>
                <ProjectBannerTextContainer>
                    <ProjectBannerTitle
                        maxLength="20"
                        name="title"
                        ref={titleRef}
                        aria-label="Project title"
                        type="text"
                        disabled={!isEditing}
                        key={title}
                        defaultValue={title}
                    />
                    <ProjectBannerDescription
                        maxLength="80"
                        name="description"
                        aria-label="Description"
                        rows="2"
                        disabled={!isEditing}
                        key={description}
                        defaultValue={description}
                    />
                </ProjectBannerTextContainer>
                <ProjectBannerButtonsContainer>
                    {isOwner ? (
                        <>
                            {isEditing ? (
                                <ProjectBannerButton type="submit">
                                    <ProjectBannerButtonImage
                                        src={SubmitIcon}
                                        alt="Submit project details"
                                    />
                                </ProjectBannerButton>
                            ) : (
                                <ProjectBannerButton
                                    type="button"
                                    onClick={turnOnEdit}
                                    aria-label="Edit project"
                                >
                                    <ProjectBannerButtonImage
                                        src={EditIcon}
                                        alt="Edit project details"
                                    />
                                </ProjectBannerButton>
                            )}
                            <ProjectBannerLabel htmlFor="banner-background">
                                <ProjectBannerButtonImage
                                    src={ChangePhotoIcon}
                                    alt="Change project banner"
                                />
                            </ProjectBannerLabel>
                            <ProjectBannerFileInput
                                onChange={handleChangeImage}
                                type="file"
                                accept="image/png, image/jpeg"
                                id="banner-background"
                            />
                        </>
                    ) : null}
                </ProjectBannerButtonsContainer>
            </ProjectBannerContentContainer>
        </ProjectBannerContainer>
    );
};

export default ProjectBanner;
