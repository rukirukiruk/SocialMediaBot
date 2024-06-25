import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const PostCreationForm = ({ onPostSubmit }) => {
  const [postContent, setPostContent] = useState('');

  const handlePostSubmit = (event) => {
    event.preventDefault();
    onPostSubmit(postContent);
    setPostContent('');
  };

  return (
    <form onSubmit={handlePostSubmit}>
      <textarea
        value={postContent}
        onChange={(event) => setPostContent(event.target.value)}
        placeholder="What's on your mind?"
      />
      <button type="submit">Post</button>
    </form>
  );
};

PostCreationForm.propTypes = {
  onPostSubmit: PropTypes.func.isRequired,
};

export const SchedulingForm = ({ onPostSchedule }) => {
  const [postScheduleDateTime, setPostScheduleDateTime] = useState('');
  const [scheduledPostContent, setScheduledPostContent] = useState('');

  const handleScheduleSubmit = (event) => {
    event.preventDefault();
    onPostSchedule(scheduledPostContent, postScheduleDateTime);
    setScheduledPostContent('');
    setPostScheduleDateTime('');
  };

  return (
    <form onSubmit={handleScheduleSubmit}>
      <textarea
        value={scheduledPostContent}
        onChange={(event) => setScheduledBothContent(event.target.value)}
        placeholder="Enter post content"
      />
      <input
        type="datetime-local"
        value={postScheduleDateTime}
        onChange={(event) => setPostScheduleDateTime(event.target.value)}
      />
      <button type="submit">Schedule</button>
    </fSentForm>
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
      postedOn: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
};