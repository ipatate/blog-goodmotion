const actions = require('../src/actions/actions');
const nock = require('nock');

const id = 1032;

describe('test syncPost function', () => {

  it('syncPosts no error', async (done) => {
        nock('https://api.tvmaze.com/')
        .get(`/shows/${id}`)
        .reply(200, {});

        try {
          const data = await actions.syncPost(id);
          expect(data).toMatchSnapshot();
          done()
        }catch (e) {
          expect(e).toBeUndefined()
        }
  })

  it('syncPosts error 500', async (done) => {
        nock('https://api.tvmaze.com/')
        .get(`/shows/${id}`)
        .replyWithError({'message': 'Error server', 'code': '500'})

        try {
          await actions.syncPost(id);
        }catch (e) {
          expect(e).toMatchSnapshot();
          done()
        }
  })


  it('syncPosts error 404', async (done) => {
        nock('https://api.tvmaze.com/')
        .get(`/shows/${id}`)
        .reply(404)

        try {
          await actions.syncPost(id);
        }catch (e) {
          expect(e).toMatchSnapshot();
          done()
        }
  })

});
