import { useState, useEffect } from 'react'; 
import SearchIcon from '../../images/search.svg';
import { db } from '../../firebase';

import useInfiniteScroll from '../../hooks/useInfiniteScroll';

import { SearchBar, PostsContainer } from './Posts.styles';
import Post from './Post';

const GlobalPosts = () => {

    const [searchTerm, setSearchTerm] = useState(null);
    const chunkSize = 5;

    const handleChangeSearchTerm = e => {
        e.preventDefault();
        const form = e.target;
        const { value } = form.elements['search']
        setSearchTerm(value);
    }

    const loadMoreData = async () => {
        try{
            let postsRef = db.collection('posts').orderBy('createdAt').startAfter(lastVisible).limit(chunkSize);
            if(searchTerm){
                postsRef = db.collection('posts').where("title", ">=", searchTerm).where("title", "<=", searchTerm + "\uf8ff").orderBy('title').orderBy('createdAt').startAfter(lastVisible).limit(chunkSize);
            }
            const posts = await postsRef.get();
            if(posts.empty) return setHasMore(false);
            setLastVisible(posts.docs[posts.docs.length-1]);
            const postsArray = [];
            posts.forEach(post => (
                postsArray.unshift({...post.data(), id: post.id})
            ));
            setData(prev => [...prev, ...postsArray]);
        }
        catch(error){
            console.error(error);
            setHasMore(false);
        }
    }

    const { last, data, setData, setHasMore, lastVisible, setLastVisible } = useInfiniteScroll(loadMoreData);

    useEffect(() => {
        setHasMore(true);
    }, [searchTerm, setHasMore]);

    useEffect(() => {
        const getData = async () => {
            try{
                let postsRef = db.collection('posts').limit(chunkSize).orderBy('createdAt');
                if(searchTerm){
                    postsRef = db.collection('posts').where("title", ">=", searchTerm).where("title", "<=", searchTerm + "\uf8ff").orderBy('title').orderBy('createdAt').limit(chunkSize);
                }
                const posts = await postsRef.get();
                setLastVisible(posts.docs[posts.docs.length-1]);
                const postsArray = [];
                posts.forEach(post => (
                    postsArray.unshift({...post.data(), id: post.id})
                ));
                setData(postsArray); 
            }
            catch(error){
                console.error(error);
            }
        }
        getData();
    }, [searchTerm, setData, setLastVisible])

    return(
        <>
            <nav aria-label='search'>
                <SearchBar onSubmit={handleChangeSearchTerm} >
                    <input placeholder='Search' type='text' name='search' id='search' />
                    <button type='submit'>
                        <img src={SearchIcon} alt='Search' />
                    </button>
                </SearchBar>
            </nav>
            <PostsContainer>
                {data.map(({title, id, authorID, author, createdAt, description, fileURL, fileType}, index) => {
                    if(data.length === index + 1) return <Post innerRef={last} key={id} title={title} authorID={authorID} author={author} createdAt={createdAt} id={id} description={description} fileURL={fileURL} fileType={fileType} />
                    return <Post key={id} title={title} authorID={authorID} author={author} createdAt={createdAt} id={id} description={description} fileURL={fileURL} fileType={fileType} />
                })}
            </PostsContainer>
        </>
    )
}

export default GlobalPosts;