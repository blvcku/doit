import { useEffect } from 'react';
import { db } from '../../firebase';
import SearchIcon from '../../images/search.svg';

import useAuth from '../../hooks/useAuth';
import useFilter from '../../hooks/useFilter';

import { SearchBar, PostsContainer } from './Posts.styles';
import Post from './Post';

const MyPosts = () => {

    const { currentUser: {uid} } = useAuth();
    const { setData, setFilter, filteredData } = useFilter();

    const handleChangeFilter = e => {
        e.preventDefault();
        const form = e.target;
        const { value } = form.elements['search'];
        setFilter(value);
    }

    useEffect(() => {
        const unsubscribe = db.collection('posts').where('authorID', '==', uid).orderBy('createdAt').onSnapshot(posts => {
            const postsList = [];
            posts.forEach(post => {
                postsList.unshift({...post.data(), id: post.id});
            })
            setData(postsList);
        });
        return unsubscribe;
    }, [uid, setData]);

    return(
        <>
            <nav aria-label='search'>
                <SearchBar onSubmit={handleChangeFilter} >
                    <input placeholder='Search' type='text' name='search' id='search' />
                    <button type='submit'>
                        <img src={SearchIcon} alt='Search' />
                    </button>
                </SearchBar>
            </nav>
            <PostsContainer>
                {filteredData.map(({title, id, authorID, author, createdAt, description, fileURL, fileType}) => (
                    <Post key={id} title={title} authorID={authorID} author={author} createdAt={createdAt} id={id} description={description} fileURL={fileURL} fileType={fileType} />
                ))}
            </PostsContainer>
        </>
    )
}

export default MyPosts;