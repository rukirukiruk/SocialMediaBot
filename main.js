import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const BASE_API_URL = process.env.BASE_URL;
const POSTS_API_ENDPOINT = `${BASE_API_URL}/posts`;
const SCHEDULE_API_ENDPOINT = `${BASE_API_URL}/schedule`;
const ANALYTICS_API_ENDPOINT = `${BASE_API_URL}/analytics`;

function createNewPost(newPostDetails) {
  axios.post(POSTS_API_ENDPOINT, newPostDetails)
    .then(response => {
      console.log('Post created successfully:', response.data);
    })
    .catch(error => {
      console.error('Error creating post:', error);
    });
}

function scheduleNewPost(newScheduleDetails) {
  axios.post(SCHEDULE_API_ENDPOINT, newScheduleDetails)
    .then(response => {
      console.log('Post scheduled successfully:', response.data);
    })
    .catch(error => {
      console.error('Error scheduling post:', error);
    });
}

function retrieveAllPosts() {
  axios.get(POSTS_API_ENDPOINT)
    .then(response => {
      const postsData = response.data;
      console.log('Fetched posts:', postsData);
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
}

function retrieveScheduledPosts() {
  axios.get(SCHEDULE_API_ENDPOINT)
    .then(response => {
      const scheduleData = response.data;
      console.log('Fetched schedule:', scheduleData);
    })
    .catch(error => {
      console.error('Error fetching schedule:', error);
    });
}

function retrievePostsAnalytics() {
  axios.get(ANALYTICS_API_ENDPOINT)
    .then(response => {
      const analyticsData = response.data;
      console.log('Fetched analytics:', analyticsData);
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