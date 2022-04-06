import { useState, useEffect } from 'react'; 
import SearchIcon from '../../images/search.svg';
import { postsIndex } from '../../algolia';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import { SearchBar, PostsContainer } from './Posts.styles';
import Post from './Post';

const GlobalPosts = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [posts, setPosts] = useState([]);
    const { last, setHasMore, currentPage, setCurrentPage, setLoading } = useInfiniteScroll();
    const chunkSize = 5;

    const handleChangeSearchTerm = e => {
        e.preventDefault();
        const form = e.target;
        const { value } = form.elements['search']
        setSearchTerm(value);
    }

    useEffect(() => {
        setPosts([]);
        setCurrentPage(0);
    }, [searchTerm, setCurrentPage]);

    useEffect(() => {
        const getData = async () => {
            try{
                setLoading(true);
                const result = await postsIndex.search(searchTerm ? searchTerm : '', {
                    hitsPerPage: chunkSize,
                    page: currentPage
                });
                const posts = result.hits;
                setHasMore(posts.length > 0);
                const postsArray = [];
                posts.forEach(post => (
                    postsArray.push({...post, id: post.objectID, createdAt: { seconds: post.createdAt._seconds }})
                ));
                setPosts(prev => [...prev, ...postsArray]); 
            }
            catch(error){
                console.error(error);
                setHasMore(false);
            }
            setLoading(false);
        }
        getData();
    }, [searchTerm, setHasMore, currentPage, setLoading])

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
                {posts.map(({title, id, authorID, author, createdAt, description, file}, index) => {
                    if(posts.length === index + 1) return <Post innerRef={last} key={id} title={title} authorID={authorID} author={author} createdAt={createdAt} id={id} description={description} file={file} />
                    return <Post key={id} title={title} authorID={authorID} author={author} createdAt={createdAt} id={id} description={description} file={file} />
                })}
            </PostsContainer>
        </>
    )
}

export default GlobalPosts;