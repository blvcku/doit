import EditIcon from './edit.svg';
import ChangePhotoIcon from './photo.svg';
import SubmitIcon from './submit.svg';

import { BannerContainer, Title, Description, Button, Label, InputFile, FlexContainer } from './Project.styles';

const Banner = ({title, description, isOwner, isEditing, turnOnEdit, titleRef}) => {
    return(
        <BannerContainer>
            <FlexContainer>
                <div>
                    <Title name='title' ref={titleRef} aria-label='Project title' type='text' disabled={!isEditing} defaultValue={title}></Title>
                    <Description name='description' aria-label='Description' rows='2' disabled={!isEditing} defaultValue={description}></Description>
                </div>
                <div>
                    {isOwner ? (
                        <>
                            {isEditing ? (
                                <Button type='submit'>
                                    <img src={SubmitIcon} alt='Submit'/>
                                </Button>
                            ) : (
                                <Button type='button' onClick={turnOnEdit} aria-label='Edit project' >
                                    <img src={EditIcon} alt='Edit'/>
                                </Button>
                            )}
                            <Label aria-label='Change project banner' htmlFor='banner-background'>
                                <img src={ChangePhotoIcon} alt='Change' />
                            </Label>
                            <InputFile type='file' id='banner-background' />
                        </>
                    ) : (
                        null
                    )}
                </div>
            </FlexContainer>
        </BannerContainer>
    )
}

export default Banner;