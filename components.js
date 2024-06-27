import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export const PostCreationForm = ({ onPostSubmit }) => {
  const [postContent, setPostContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePostSubmit = (event) => {
    event.preventDefault();
    if (!postContent.trim()) {
      setErrorMessage('Post content cannot be empty.');
      return;
    }
    try {
      onPostSubmit(postContent);
      setPostContent('');
      setErrorMessage('');
    } catch (error) {
      console.error("Failed to submit post", error);
      setErrorMessage('Failed to submit post. Please try again.');
    }
  };

  return (
    <>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handlePostSubmit}>
        <textarea
          value={postContent}
          onChange={(event) => setPostContent(event.target.value)}
          placeholder="What's on your mind?"
        />
        <button type="submit">Post</button>
      </form>
    </>
  );
};

PostCreationForm.propTypes = {
  onPostSubmit: PropTypes.func.isRequired,
};

export const SchedulingForm = ({ onPostSchedule }) => {
  const [postScheduleDateTime, setPostScheduleDateTime] = useState('');
  const [scheduledPostContent, setScheduledPostContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleScheduleSubmit = (event) => {
    event.preventDefault();
    if (!scheduledPostContent.trim()) {
      setErrorMessage('Content cannot be empty.');
      return;
    }
    if (!postScheduleDateTime.trim()) {
      setErrorMessage('Please select a schedule date and time.');
      return;
    }
    try {
      onPostSchedule(scheduledPostContent, postScheduleDateTime);
      setScheduledPostContent('');
      setPostScheduleDateTime('');
      setErrorMessage('');
    } catch (error) {
      console.error("Failed to schedule post", error);
      setErrorMessage('Failed to schedule the post. Please try again.');
    }
  };

  return (
    <>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleScheduleSubmit}>
        <textarea
          value={scheduledPostContent}
          onChange={(event) => setScheduledPostContent(event.target.value)}
          placeholder="Enter post content"
        />
        <input
          type="datetime-local"
          value={postScheduleDateTime}
          onChange={(event) => setPostScheduleDateTime(event.target.value)}
        />
        <button type="submit">Schedule</button>
      </form>
    </>
  );
};

SchedulingForm.propTypes = {
  onPostSchedule: PropTypes.func.isRequired,
};

export const AnalyticsDisplay = ({ analyticsData }) => {
  return (
    <div>
      <h2>Post Analytics</h2>
      {analyticsData.map((dataItem, index) => (
        <div key={index}>
          <p>Post ID: {dataItem.postId}</p>
          <p>Likes: {dataItem.likes}</p>
          <p>Shares: {dataItem.shares}</p>
          <p>Views: {dataItem.views}</p>
          <p>Posted On: {moment(dataItem.postedOn).format('MMMM Do YYYY')}</p>
        </div>
      ))}
    </div>
  );
};

AnalyticsDisplay.propTypes = {
  analyticsData: PropTypes.arrayOf(
    PropTypes.shape({
      postId: PropTypes.number.isRequired,
      likes: PropTypes.number.isRequired,
      shares: PropTypes.number.isRequired,
      views: PropTypes.number.isRequired,
: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
};