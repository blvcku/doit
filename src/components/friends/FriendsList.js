import { useState, useEffect } from "react";
import { functions } from "../../firebase";
import useAuth from "../../hooks/useAuth";
import useCarousel from "../../hooks/useCarousel";
import { GridContainer, FlexContainer, OverflowContainer, NextButton, PrevButton } from "./Friends.styles";
import Person from "./Person";
import Loader from '../loading/Loader';

const FriendsList = ({searchTerm}) => {

    const { currentUserData: { friends = [], invites = [], requests = [] } = {} } = useAuth();
    const [friendsData, setFriendsData] = useState([]);
    const [pages, setPages] = useState([]);
    const [loading, setLoading] = useState(true);
    const { handleNextSlide, handlePrevSlide, setSlides, hidePrev, hideNext, currentSlide } = useCarousel();

    useEffect(() => {
        let isMounted = true;
        const getData = async () => {
            const getFriendsData = functions.httpsCallable('getFriendsData');
            const { data } = await getFriendsData({friends: friends, invites: invites, requests: requests});
            if(!isMounted) return;
            setFriendsData(data);
            setLoading(false);
        }
        getData();
        return () => isMounted = false;
    }, [friends, invites, requests])

    useEffect(() => {
        let filteredData = friendsData;
        if(searchTerm){
            const matchesFilter = new RegExp(searchTerm.trim(), 'i');
            filteredData = friendsData.filter(({displayName}) => matchesFilter.test(displayName));
        }
        const chunkSize = 8;
        const result = [];
        for(let i = 0; i < filteredData.length; i += chunkSize){
            result.push(filteredData.slice(i, i + chunkSize));
        }
        setPages(result);
    }, [friendsData, searchTerm]);

    useEffect(() => {
        setSlides(pages.length);
    }, [pages, setSlides]);

    return(
        <>
            {loading && <Loader />}
            <h2>Friends List</h2>
            <OverflowContainer>
                <FlexContainer currentSlide={currentSlide}>
                    {pages.map((page, index) => (
                        <GridContainer key={index}>
                            {page.map(({uid, displayName, photoURL, status}) => (
                                <Person key={uid} status={status} uid={uid} displayName={displayName} photoURL={photoURL}/>
                            ))}
                        </GridContainer>
                    ))}
                </FlexContainer>
            </OverflowContainer>
            <PrevButton hide={hidePrev} onClick={handlePrevSlide} type='button'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                    <path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/>
                    <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z"/>
                </svg>
            </PrevButton>
            <NextButton hide={hideNext} onClick={handleNextSlide} type='button'>
                <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                    <g>
                        <path d="M0,0h24v24H0V0z" fill="none"/>
                    </g>
                    <g>
                        <polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12"/>
                    </g>
                </svg>
            </NextButton>
        </>
    )
}

export default FriendsList;