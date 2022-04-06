import useImage from '../../hooks/useImage';
import { Container, Wrapper } from './Image.styles';

const EnlargedImage = () => {

    const { image, setImage } = useImage();

    const handleCloseImage = e => {
        e.preventDefault();
        setImage({});
    }

    return(
        <>
            {image && image.url && image.name && (
                <Container onClick={handleCloseImage}>
                    <Wrapper>
                        <img src={image.url} alt={image.name} />
                    </Wrapper>
                </Container>
            )}
        </>
    )
}

export default EnlargedImage;