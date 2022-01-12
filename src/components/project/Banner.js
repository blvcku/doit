import EditIcon from '../../images/project/edit.svg';
import ChangePhotoIcon from '../../images/project/photo.svg';
import SubmitIcon from '../../images/project/submit.svg';
import { storage, db, functions } from '../../firebase';

import useError from '../../hooks/useError';

import { BannerContainer, Title, Description, Button, Label, InputFile, FlexContainer } from './Project.styles';

const Banner = ({title, description, isOwner, isEditing, turnOnEdit, titleRef, id, background}) => {

    const { dispatchError } = useError();

    const handleChangeImage = e => {
        e.preventDefault();
        dispatchError({type: 'reset'});
        const file = e.target.files[0];
        if(!file) return;
        if(file.type !== 'image/png' && file.type !== 'image/jpeg'){
            return dispatchError({type: 'update/wrong-image-type'});
        }
        const changeProjectPhoto = functions.httpsCallable('changeProjectPhoto');
        const reader = new FileReader();
        reader.onloadend = async e => {
            try{
                await changeProjectPhoto({id: id, file: e.target.result, filetype: file.type});
                const url = await storage.ref(`projects/${id}/banner`).getDownloadURL();
                await db.collection('projects').doc(id).update({
                    photoURL: url
                });
            }
            catch(error){
                return dispatchError({type: 'projects/change-image-failed'});
            }
        }
        reader.readAsDataURL(file);
    }

    return(
        <BannerContainer background={background}>
            <FlexContainer>
                <div>
                    <Title name='title' ref={titleRef} aria-label='Project title' type='text' disabled={!isEditing} key={title} defaultValue={title}></Title>
                    <Description name='description' aria-label='Description' rows='2' disabled={!isEditing} key={description} defaultValue={description}></Description>
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
                            <InputFile onChange={handleChangeImage} type='file' accept='image/png, image/jpeg' id='banner-background' />
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