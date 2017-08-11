const actions = require('../src/actions/actions');
const nock = require('nock');

const page = 1;

describe('test syncPosts function', () => {

  it('syncPosts no error', async (done) => {
        nock('https://api.tvmaze.com/')
        .get(`/search/shows?q=girls&page=${page}`)
        .reply(200, {});

        try {
          const data = await actions.syncPosts();
          expect(data).toMatchSnapshot();
          done()
        }catch (e) {
          expect(e).toBeUndefined()
        }
  })

  it('syncPosts error 500', async (done) => {
        nock('https://api.tvmaze.com/')
        .get(`/search/shows?q=girls&page=${page}`)
        .replyWithError({'message': 'Error server', 'code': '500'})

        try {
          await actions.syncPosts();
        }catch (e) {
          expect(e).toMatchSnapshot();
          done()
        }
  })


  it('syncPosts error 404', async (done) => {
        nock('https://api.tvmaze.com/')
        .get(`/search/shows?q=girls&page=${page}`)
        .reply(404)

        try {
          await actions.syncPosts();
        }catch (e) {
          expect(e).toMatchSnapshot();
          done()
        }
  })

});
