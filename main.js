import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const BASE_URL = process.env.BASE_URL;
const POSTS_ENDPOINT = `${BASE_URL}/posts`;
const SCHEDULE_ENDPOINT = `${BASE_URL}/schedule`;
const ANALYTICS_ENDPOINT = `${BASE_URL}/analytics`;
function createPost(postDetails) {
  axios.post(POSTS_ENDPOINT, postDetails)
    .then(response => {
      console.log('Post created successfully:', response.data);
    })
    .catch(error => {
      console.error('Error creating post:', error);
    });
}
function schedulePost(scheduleDetails) {
  axios.post(SCHEDULE_ENDPOINT, scheduleDetails)
    .then(response => {
      console.log('Post scheduled successfully:', response.data);
    })
    .catch(error => {
      console.error('Error scheduling post:', error);
    });
}
function fetchPosts() {
  axios.get(POSTS_ENDPOINT)
    .then(response => {
      const posts = response.data;
      console.log('Fetched posts:', posts);
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
}
function fetchSchedule() {
  axios.get(SCHEDULE_ENDPOINT)
    .then(response => {
      const schedule = response.data;
      console.log('Fetched schedule:', schedule);
    })
    .catch(error => {
      console.error('Error fetching schedule:', error);
    });
}
function fetchAnalytics() {
  axios.get(ANALYTICS_ENDPOINT)
    .then(response => {
      const analytics = response.data;
      console.log('Fetched analytics:', analytics);
    })
    .catch(error => {
      console.error('Error fetching analytics data:', error);
    });
}
let postDetails = { title: 'New Post', content: 'Hello, world!' };
createPost(postDetails);
let scheduleDetails = { postId: '123', date: '2023-01-01T00:00:00Z' };
schedulePost(scheduleDetails);
fetchPosts();
fetchSchedule();
fetchAnalytics();