import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP,
    process.env.REACT_APP_ALGOLIA_KEY,
);

export const usersIndex = searchClient.initIndex('users');
export const postsIndex = searchClient.initIndex('posts');
