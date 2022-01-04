import { useEffect, useState, useRef, useCallback } from 'react';
import { db } from '../../firebase';

import useAuth from '../../hooks/useAuth';

import { GridContainer, FlexContainer, OverflowContainer, PrevButton, NextButton } from "./Friends.styles";
import Person from "./Person";
import Loader from '../loading/Loader';

const SearchList = ({searchTerm}) => {

    const [persons, setPersons] = useState([]);
    const [pages, setPages] = useState([]);
    const { currentUser, currentUserData: {friends, invites, requests} } = useAuth();
    const [currentPage, setCurrentPage] = useState(0);
    const [hideNext, setHideNext] = useState(true);
    const [hidePrev, setHidePrev] = useState(true);
    const [loading, setLoading] = useState(true);
    const [invisibleLoading, setInvisibleLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [lastVisible, setLastVisible] = useState(null);
    const observer = useRef();

    const lastPerson = useCallback(personElement => {
        let isMounted = true;
        if(!isMounted) return;
        if(loading) return;
        if(invisibleLoading) return;
        if(observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting && hasMore && isMounted){
                const loadMoreData = async () => {
                    try{
                        if(isMounted) setInvisibleLoading(true);
                        let users;
                        if(searchTerm){
                            users = await db.collection('users')
                                .where('displayName', '!=', currentUser.displayName)
                                .where("displayName", ">=", searchTerm)
                                .where("displayName", "<=", searchTerm + "\uf8ff")
                                .startAfter(lastVisible)
                                .limit(8)
                                .get();
                        }
                        else{
                            users = await db.collection('users')
                                .where('uid', '!=', currentUser.uid)
                                .startAfter(lastVisible)
                                .limit(8)
                                .get();
                        }
                        if(users.empty){
                            if(isMounted){
                                setHasMore(false);
                                return setInvisibleLoading(false);
                            }
                        }
                        if(isMounted) setLastVisible(users.docs[users.docs.length-1])
                        const usersArray = [];
                        users.forEach(user => {
                            const userData = user.data();
                            usersArray.push({
                                displayName: userData.displayName,
                                photoURL: userData.photoURL,
                                uid: userData.uid
                            });
                        });
                        if(isMounted) setPersons(prev => [...prev, ...usersArray]);
                    }
                    catch(error){
                        console.error(error);
                    }
                }
                if(isMounted) loadMoreData();
            }
        });
        if(personElement && isMounted) observer.current.observe(personElement);
        return () => { isMounted = false }
    }, [loading, hasMore, lastVisible, searchTerm, currentUser, invisibleLoading])

    const handleNextPage = e => {
        e.preventDefault();
        setCurrentPage(prev => prev + 1);
    }
    
    const handlePrevPage = e => {
        e.preventDefault();
        setCurrentPage(prev => prev - 1);
    }

    useEffect(() => {
        let isMounted = true;
        if(pages.length){
            if(isMounted){
                if(currentPage > (pages.length - 1)) setCurrentPage((pages.length - 1));
                if(currentPage < 0) setCurrentPage(0);
                if(currentPage === 0) setHidePrev(true);
                else setHidePrev(false);
                if(currentPage === (pages.length - 1)) setHideNext(true);
                else setHideNext(false);
            }
        }
        return () => { isMounted = false }
    }, [currentPage, pages]);

    useEffect(() => {
        let isMounted = true;   
        const getData = async () => {
            try{
                if(isMounted){
                    setInvisibleLoading(true);
                    setLoading(true);
                }
                let users;
                const usersArray = [];
                if(searchTerm){
                    users = await db.collection('users').where('displayName', '!=', currentUser.displayName).where("displayName", ">=", searchTerm).where("displayName", "<=", searchTerm + "\uf8ff").limit(8).get();
                }
                else{
                    users = await db.collection('users').where('uid', '!=', currentUser.uid).limit(8).get();
                }
                if(isMounted) setLastVisible(users.docs[users.docs.length-1])
                users.forEach(user => {
                    const userData = user.data();
                    usersArray.push({
                        displayName: userData.displayName,
                        photoURL: userData.photoURL,
                        uid: userData.uid
                    })
                })
                if(isMounted) setPersons(usersArray);
            }
            catch(error){
                console.error(error);
            }
        }
        if(isMounted){
            getData();
            setLoading(false);
            setInvisibleLoading(false);
        }
        return () => { isMounted = false }
    }, [searchTerm, currentUser]);

    useEffect(() => {
        let isMounted = true;
        if(persons){
            const mappedPersons = persons.map(person => {
                if(friends.includes(person.uid)) return {...person, status: 'friend'};
                if(invites.includes(person.uid)) return {...person, status: 'invite'};
                if(requests.includes(person.uid)) return {...person, status: 'request'};
                return person;
            });
            const chunkSize = 8;
            const result = [];
            for(let i = 0; i < mappedPersons.length; i += chunkSize){
                result.push(mappedPersons.slice(i, i + chunkSize));
            }
            if(isMounted) setPages(result);
        }
        return () => { isMounted = false }
    }, [friends, invites, requests, persons]);

    return(
        <>
            {loading && <Loader />}
            <h2>Friends By Search</h2>
            <OverflowContainer>
                <FlexContainer currentPage={currentPage}>
                    {pages.map((page, pageIndex) => (
                        <GridContainer key={pageIndex}>
                            {page.map(({uid, displayName, photoURL, status}, index) => {
                                if(pages.length === pageIndex + 1 && pages[pageIndex].length === index + 1){
                                    return <Person innerRef={lastPerson} key={uid} status={status} uid={uid} displayName={displayName} photoURL={photoURL}/>
                                }
                                return <Person key={uid} status={status} uid={uid} displayName={displayName} photoURL={photoURL}/>
                            })}
                        </GridContainer>
                    ))}
                </FlexContainer>
            </OverflowContainer>
            <PrevButton hide={hidePrev} onClick={handlePrevPage} type='button'>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
                    <path d="M0 0h24v24H0V0z" fill="none" opacity=".87"/>
                    <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z"/>
                </svg>
            </PrevButton>
            <NextButton hide={hideNext} onClick={handleNextPage} type='button'>
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

export default SearchList;