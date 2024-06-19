import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const BASE_API_URL = process.env.BASE_API_PAGE_URL;
let postsCache = null;
let lastFetchTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; 

async function fetchPosts(useCache = true) {
    const now = new Date().getTime();
    if(useCache && postsCache && (now - lastFetchTimestamp < CACHE_DURATION)) {
        return postsCache; 
    }
    try {
        const response = await axios.get(`${BASE_API_URL}/posts`);
        postsCache = response.data; 
        last_FETCH_TIMESTAMP = now; 
        return response.data;
    } catch (error) {
        console.error('An error occurred while fetching posts:', error);
    }
}

async function createPost(postData) {
    try {
        const response = await axios.post(`${BASE_API_URL}/posts`, postData);
        postsCache = null; 
        return response.data;
    } catch (error) {
        console.error('An error occurred while creating a post:', error);
    }
}

async function updatePost(postId, updateData) {
    try {
        const response = await axios.put(`${BASE_API_URL}/posts/${postId}`, updateData);
        postsCache = null; 
        return response.data;
    } catch (error) {
        console.error(`An error occurred while updating post with ID=${postId}:`, error);
    }
}

async function schedulePost(scheduleData) {
    try {
        const response = await axios.post(`${BASE_API_URL}/schedule`, schedule(Data);
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

export { fetchPosts, createPost, updatePost, schedulePost, fetchAnalytics };