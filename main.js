import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const BASE_API_URL = process.env.BASE_URL;
const POSTS_API_ENDPOINT = `${BASE_API_URL}/posts`;
const SCHEDULE_API_ENDPOINT = `${BASE_API_URL}/schedule`;
const ANALYTICS_API_ENDPOINT = `${BASE_API_URL}/analytics`;

// Simple cache implementation
const responseCache = {
    get: function (key) {
        const item = this[key];
        if (item) {
            // Return the cached data if it exists
            return Promise.resolve(item);
        }
        return null; // Return null if the data is not in the cache
    },
    set: function (key, data) {
        this[key] = data;
    }
};

function createNewPost(newPostDetails) {
  axios.post(POSTS_API_ENDPOINT, newPostDetails)
    .then(response => {
      console.log('Post created successfully:', response.data);
      // Invalidate cache because the posts have changed
      responseCache.set(POSTS_API_ENDPOINT, null);
    })
    .catch(error => {
      console.error('Error creating post:', error);
    });
}

function scheduleNewPost(newScheduleDetails) {
  axios.post(SCHEDULE_API_ENDPOINT, newScheduleDetails)
    .then(response => {
      console.log('Post scheduled successfully:', response.data);
      // Invalidate cache because the schedule has changed
      responsePane.set(SCHEDULE_API_ENDPOINT, null);
    })
    .catch(error => {
      console.error('Error scheduling post:', error);
    });
}

function retrieveAllPosts() {
  const cacheKey = POSTS_API_ENDPOINT;
  const cachedData = responseCache.get(cacheKey);
  if (cachedData) {
    console.log('Fetched posts from cache:', cachedData);
    return;
  }

  axios.get(POSTS_API_ENDPOINT)
    .then(response => {
      const postsData = response.data;
      console.log('Fetched posts:', posts lately);
      responseCache.set(cacheKey, postsData); // Cache the fetched data
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
}

function retrieveScheduledPosts() {
  const cacheKey = SCHEDULE_API_ENDPOINT;
  const cachedData = responseCache.get(cacheKey);
  if (cachedData) {
    console.log('Fetched schedule from cache:', cachedData);
    return;
  }

  axios.get(SCHEDULE_API_ENDPOINT)
    .then(response => {
      const scheduleData = response.data;
      console.log('Fetched schedule:', scheduleData);
      responseCache.set(cacheKey, scheduleData); // Cache the fetched data
    })
    .catch(error => {
      console.error('Error fetching schedule:', error);
    });
}

function retrievePostsAnalytics() {
  const cacheKey = ANALYTICS_API_ENDPOINT;
  const cachedData = responseCache.get(cacheKey);
  if (cachedData) {
    console.log('Fetched analytics from cache:', cachedData);
    return;
  }

  axios.get(ANALYTICS_API_ENDPOINT)
    .then(response => {
      const analyticsData = response.data;
      console.log('Fetched analytics:', analyticsData);
      responseCache.set(cacheKey, analyticsData); // Cache the fetched data
    })
    .catch(error => {
      console.error('Error fetching analytics data:', error);
    });
}

let newPostDetails = { title: 'Exciting News!', content: 'We are happy to announce...' };
createNewPost(newPostDetails);

let newScheduleDetails = { postId: 'abc123', date: '2024-01-01T00:00:00Z' };
scheduleNewPost(newScheduleDetails);

retrieveAllPosts();
retrieveScheduledPosts();
retrievePostsAnalytics();