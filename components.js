import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const PostCreationForm = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(content);
    setContent('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      />
      <button type="submit">Post</button>
    </form>
  );
};
PostCreationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export const SchedulingForm = ({ onSchedule }) => {
  const [datetime, setDatetime] = useState('');
  const [content, setContent] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onSchedule(content, datetime);
    setContent('');
    setDatetime('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter post content"
      />
      <input
        type="datetime-local"
        value={datetime}
        onChange={(e) => setDatetime(e.target.value)}
      />
      <button type="submit">Schedule</button>
    </form>
  );
};
SchedulingForm.propTypes = {
  onSchedule: PropTypes.func.isRequired,
};
export const AnalyticsDisplay = ({ analyticsData }) => {
  return (
    <div>
      <h2>Post Analytics</h2>
      {analyticsData.map((data, index) => (
        <div key={index}>
          <p>Post ID: {data.postId}</p>
          <p>Likes: {data.likes}</p>
          <p>Shares: {data.shares}</p>
          <p>Views: {data.views}</p>
          <p>Posted On: {moment(data.postedOn).format('MMMM Do YYYY')}</p>
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
      views: Propositions.number.isRequired,
      postedOn: PropTypes.instanceOf(Date).isRequired,
    })
  ).isRequired,
};