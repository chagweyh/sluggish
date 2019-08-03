import request from 'supertest';
import mongoose from 'mongoose';
import { generateAuthToken } from '../auth/auth.service';
import User from '../users/user.model';
import Channel from './channel.model';
import app from '../../app';

describe('/api/channels', () => {
  afterEach(async () => {
    await Promise.all([Channel.deleteMany({}), User.deleteMany({})]);
  });

  describe('GET /', () => {
    it('should return all channels', async () => {
      const channels = [
        {
          name: 'channel1',
          createdBy: mongoose.Types.ObjectId(),
        },
        {
          name: 'channel2',
          createdBy: mongoose.Types.ObjectId(),
        },
      ];

      await Channel.insertMany(channels);

      const res = await request(app).get('/api/channels');

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === 'channel1')).toBeTruthy();
      expect(res.body.some((g) => g.name === 'channel2')).toBeTruthy();
    });
  });

  describe('GET /:slug', () => {
    it('should return a channel if valid slug is passed', async () => {
      const channel = new Channel({
        name: 'channel1',
        createdBy: mongoose.Types.ObjectId(),
      });
      await channel.save();

      const res = await request(app).get(`/api/channels/${channel.slug}`);

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('name', channel.name);
    });

    // it('should return 404 if invalid id is passed', async () => {
    //   const res = await request(app).get('/api/channels/1');

    //   expect(res.status).toBe(404);
    // });

    it('should return 404 if no channel with the given slug exists', async () => {
      const slug = Math.random()
        .toString(36)
        .substr(2, 5);
      const res = await request(app).get(`/api/channels/${slug}`);

      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    let token;
    let name;

    const exec = async () => {
      return request(app)
        .post('/api/channels')
        .set('Authorization', `Bearer ${token}`)
        .send({ name });
    };

    beforeEach(async () => {
      const user = {
        _id: mongoose.Types.ObjectId(),
      };
      token = await generateAuthToken(user);
      name = 'channel1';
    });

    it('should return 401 if client is not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 400 if channel is less than 5 characters', async () => {
      name = '12';

      const res = await exec();

      expect(res.status).toBe(422);
    });

    it('should return 400 if channel is more than 50 characters', async () => {
      name = new Array(52).join('a');

      const res = await exec();

      expect(res.status).toBe(422);
    });

    it('should save the channel if it is valid', async () => {
      await exec();

      const channel = await Channel.find({ name: 'channel1' });

      expect(channel).not.toBeNull();
    });

    it('should return the channel if it is valid', async () => {
      const res = await exec();

      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name', 'channel1');
    });
  });

  describe('DELETE /:id', () => {
    let token;
    let channel;
    let id;

    const exec = async () => {
      return request(app)
        .delete(`/api/channels/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .send();
    };

    beforeEach(async () => {
      const user = new User({
        username: 'user1',
        email: 'user@email.com',
        password: '123456',
      });
      await user.save();

      token = await generateAuthToken(user);

      channel = new Channel({
        name: 'channel1',
        createdBy: user._id,
      });
      await channel.save();

      id = channel._id;
    });

    it('should return 401 if client is not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 404 if id is invalid', async () => {
      id = 1;

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should return 404 if no channel with the given id was found', async () => {
      id = mongoose.Types.ObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should delete the channel if input is valid', async () => {
      await exec();

      const channelInDb = await Channel.findOne({ _id: id });

      expect(channelInDb).toBeNull();
    });

    it('should return the removed channel', async () => {
      const res = await exec();
      expect(res.body).toHaveProperty('_id', channel._id.toHexString());
      expect(res.body).toHaveProperty('name', channel.name);
    });

    it('should return 403 if the user is not the creator of the channel', async () => {
      const user = {
        _id: mongoose.Types.ObjectId(),
      };

      token = await generateAuthToken(user);

      const res = await exec();

      expect(res.status).toBe(403);
    });
  });

  describe('POST /:id/star', () => {
    let token;
    let id;
    let user;

    const exec = async () => {
      return request(app)
        .post(`/api/channels/${id}/star`)
        .set('Authorization', `Bearer ${token}`)
        .send();
    };

    beforeEach(async () => {
      user = new User({
        username: 'user1',
        email: 'user@email.com',
        password: '123456',
        stars: [],
      });
      await user.save();

      id = mongoose.Types.ObjectId().toHexString();

      token = await generateAuthToken(user);
    });
    it('should return 401 if client is not logged in', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return 404 if id is invalid', async () => {
      id = 1;

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it('should favorite the channel', async () => {
      const { body, status } = await exec();
      expect(body.stars.length).toBe(1);
      expect(body.stars).toContain(id);
      expect(status).toBe(200);
    });

    it('should unfavorite the channel', async () => {
      user = { ...user, stars: [id] };
      const { body, status } = await exec();
      expect(body.stars.length).toBe(0);
      expect(status).toBe(200);
    });
  });
});
