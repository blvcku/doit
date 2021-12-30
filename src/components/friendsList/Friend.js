import { FriendContainer, SmallButton, ImageContainer } from "./Friends.styles";
import TestImg from './search.svg';
import DeleteIcon from '../project/tasks/delete.svg';

const Friend = () => {
    return(
        <FriendContainer>
            <ImageContainer>
                <img src={TestImg} alt='test' />
            </ImageContainer>
            <p>Sumati Rajani</p>
            <div>
                <SmallButton type='button'>
                    <img src={DeleteIcon} alt='Delete' />
                </SmallButton>
            </div>
        </FriendContainer>
    )
}

export default Friend;