import { useEffect } from 'react';
import { db } from '../../../services/firebase';
import SearchIcon from '../../../assets/icons/search.svg';
import useAuth from '../../../contexts/auth-context/useAuth';
import useFilter from '../../../hooks/useFilter';
import useTitle from '../../../hooks/useTitle';
import { SearchBar, PostsContainer } from './Posts.styles';
import Post from './Post';

const MyPosts = () => {
    const {
        currentUser: { uid },
    } = useAuth();
    const { setData, setFilter, filteredData } = useFilter();
    useTitle('My Posts');

    const handleChangeFilter = (e) => {
        e.preventDefault();
        const form = e.target;
        const { value } = form.elements['search'];
        setFilter(value);
    };

    useEffect(() => {
        const unsubscribe = db
            .collection('posts')
            .where('authorID', '==', uid)
            .orderBy('createdAt')
            .onSnapshot((posts) => {
                const postsList = [];
                posts.forEach((post) => {
                    postsList.unshift({ ...post.data(), id: post.id });
                });
                setData(postsList);
            });
        return unsubscribe;
    }, [uid, setData]);

    return (
        <>
            <nav aria-label="search">
                <SearchBar onSubmit={handleChangeFilter}>
                    <input
                        placeholder="Search"
                        type="text"
                        name="search"
                        id="search"
                    />
                    <button type="submit">
                        <img src={SearchIcon} alt="Search" />
                    </button>
                </SearchBar>
            </nav>
            <PostsContainer>
                {filteredData.map(
                    ({
                        title,
                        id,
                        authorID,
                        author,
                        createdAt,
                        description,
                        file,
                    }) => (
                        <Post
                            key={id}
                            title={title}
                            authorID={authorID}
                            author={author}
                            createdAt={createdAt}
                            id={id}
                            description={description}
                            file={file}
                        />
                    ),
                )}
            </PostsContainer>
        </>
    );
};

export default MyPosts;
