import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const BASE_API_URL = process.env.BASE_API_URL;

async function fetchPosts() {
    try {
        const response = await axios.get(`${BASE_API_URL}/posts`);
        return response.data;
    } catch (error) {
        console.error('An error occurred while fetching posts:', error);
    }
}

async function createPost(postData) {
    try {
        const response = await axios.post(`${BASE_API_URL}/posts`, postData);
        return response.data;
    } catch (error) {
        console.error('An error occurred while creating a post:', error);
    }
}

async function schedulePost(scheduleData) {
    try {
        const response = await axios.post(`${BASE_API_URL}/schedule`, scheduleData);
        return response.data;
    } catch (error) {
        console.error('An error occurred while scheduling a post:', error);
    }
}

async function fetchAnalytics() {
    try {
        const response = await axios.get(`${BASE_API_URL}/analytics`);
        return response.data;
    } catch (error) {
        console.error('An error occurred while fetching analytics:', error);
    }
}

export { fetchPosts, createPost, schedulePost, fetchAnalytics };