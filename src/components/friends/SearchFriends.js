import { useEffect, useState } from 'react';
import { usersIndex } from '../../algolia';
import useAuth from '../../hooks/useAuth';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import useCarousel from '../../hooks/useCarousel';
import { GridContainer, FlexContainer, OverflowContainer, PrevButton, NextButton } from "./Friends.styles";
import Person from "./Person";
import Loader from '../loading/Loader';

const SearchFriends = ({searchTerm}) => {

    const [pages, setPages] = useState([]);
    const [persons, setPersons] = useState([]);
    const [loaderVisible, setLoaderVisible] = useState(true);
    const { currentUser, currentUserData: { friends = [], invites = [], requests = [] } = {} } = useAuth();
    const { handleNextSlide, handlePrevSlide, setSlides, hidePrev, hideNext, currentSlide } = useCarousel();
    const { last, setHasMore, currentPage, setCurrentPage, setLoading } = useInfiniteScroll();
    const chunkSize = 8;

    useEffect(() => {
        const getData = async () => {
            try{
                setLoading(true);
                const result = await usersIndex.search(searchTerm ? searchTerm : '', {
                    hitsPerPage: chunkSize,
                    filters: `NOT uid:${currentUser.uid}`,
                    page: currentPage
                });
                const users = result.hits;
                setHasMore(users.length > 0);
                const usersArray = [];
                users.forEach(({displayName, photoURL, uid}) => {
                    usersArray.push({
                        displayName: displayName,
                        photoURL: photoURL,
                        uid: uid
                    })
                })
                setPersons(prev => [...prev, ...usersArray]);
            }
            catch(error){
                console.error(error);
                setHasMore(false);
            }
            setLoading(false);
            setLoaderVisible(false);
        }
        getData();
    }, [searchTerm, currentPage, currentUser, setHasMore, setLoading]);

    useEffect(() => {
        if(persons){
            const mappedPersons = persons.map(person => {
                if(friends.includes(person.uid)) return {...person, status: 'friend'};
                if(invites.includes(person.uid)) return {...person, status: 'invite'};
                if(requests.includes(person.uid)) return {...person, status: 'request'};
                return person;
            });
            const result = [];
            for(let i = 0; i < mappedPersons.length; i += chunkSize){
                result.push(mappedPersons.slice(i, i + chunkSize));
            }
            setPages(result);
        }
    }, [friends, invites, requests, persons]);

    useEffect(() => {
        setLoaderVisible(true);
        setPersons([]);
        setCurrentPage(0);
    }, [searchTerm, setCurrentPage]);

    useEffect(() => {
        setSlides(pages.length);
    }, [pages, setSlides]);
    
    return(
        <>
            {loaderVisible && <Loader />}
            <h2>Friends By Search</h2>
            <OverflowContainer>
                <FlexContainer currentSlide={currentSlide}>
                    {pages.map((page, pageIndex) => (
                        <GridContainer key={pageIndex}>
                            {page.map(({uid, displayName, photoURL, status}, index) => {
                                if(pages.length === pageIndex + 1 && pages[pageIndex].length === index + 1){
                                    return <Person innerRef={last} key={uid} status={status} uid={uid} displayName={displayName} photoURL={photoURL}/>
                                }
                                return <Person key={uid} status={status} uid={uid} displayName={displayName} photoURL={photoURL}/>
                            })}
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
                    <g><path d="M0,0h24v24H0V0z" fill="none"/></g>
                    <g><polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12"/></g>
                </svg>
            </NextButton>
        </>
    )
}

export default SearchFriends;