import Redis from 'ioredis';

class RedisService {
  constructor() {
    this.redis = new Redis;
  }

  async storeRefreshKey(userId, token) {
    try {

      const key = `refresh_token:${userId}`;
      await this.redis.setex(key,  (14 * 24 * 60 * 60), token)
      return true;
    } catch(err) {
      console.log('Failed to store the refresh token in redis', err);
      return false;
    }
  }



  async getRefreshKey(userId) {
    try {
      const key = `refresh_token:${userId}`;
      return await this.redis.get(key)
    } catch(err) {
      console.error('Can not get the key', err);
      return null
    }
  }


  async redisStatus() {
    try {
      await this.redis.ping();
      return true;

    } catch(err) {
      console.err('Redis is not currently connected', err);
      return false;
    }
  }


}

const redisService = new RedisService();
export default redisService;
