// @flow
import fetch from 'isomorphic-fetch';
import Store from '../stores/store';

export const syncPosts = () =>
  fetch(`https://api.tvmaze.com/search/shows?q=girls&page=${Store.page}`)
    .then(res => res.json())
    .then(data => {
      Store.posts = data;
    })
    .catch(e => {
      throw e;
    });

export const syncPost = (id: number) =>
  fetch(`https://api.tvmaze.com/shows/${id}`).then(res => res.json()).then(data => {
    Store.post = data;
  })
  .catch(e => {
    throw e;
  });

export const findPostInPosts = (id: number) => Store.posts.find((post: Object) => +post.show.id === +id);

export const findPost = (id: number) =>
  new Promise(async resolve => {
    Store.post = null;
    const post = findPostInPosts(id);
    if (post) {
      Store.post = post.show;
      return resolve();
    }
    await syncPost(id);
    return resolve();
  });

export default syncPosts;
