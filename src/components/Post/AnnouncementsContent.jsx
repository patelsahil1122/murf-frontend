import React from 'react';
import './announcements.css'; // Assuming you have a CSS file for styling

const AnnouncementsContent = () => {
  return (
    <div className="empty-post">
      <img src="/sss.png" alt="clipboard" className="clipboard-img" />
      <h3>
        Go ahead and create your first post in <span className="channel-highlight">Announcements</span>
      </h3>
      <p className="post-subtext">Let other people know what is going on your mind</p>
      <button className="new-post-btn">New Post</button>
    </div>
  );
};

export default AnnouncementsContent;