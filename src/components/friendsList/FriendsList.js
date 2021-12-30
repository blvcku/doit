import { GridContainer, FlexContainer, OverflowContainer } from "./Friends.styles";
import Friend from "./Friend";

const FriendsList = () => {
    return(
        <>
            <h2>Friends List</h2>
            <OverflowContainer>
                <FlexContainer>
                    <GridContainer>
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                    </GridContainer>
                    <GridContainer>
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                        <Friend />
                    </GridContainer>
                </FlexContainer>
            </OverflowContainer>
        </>
    )
}

export default FriendsList;