import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ForumPage.css';

const ForumPage = () => {
  const { forumId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [forum, setForum] = useState(null);
  const userData = JSON.parse(localStorage.getItem('userData'));

  
  const pathParts = location.pathname.split('/');
  const activeSection = pathParts[4]?.toLowerCase(); // safe check

  useEffect(() => {
    const fetchForum = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/forums/${forumId}`, {
          headers: {
            authToken: userData.token,
          },
        });
        setForum(res.data.data);
      } catch (err) {
        console.error('Failed to load forum', err);
      }
    };

    if (forumId && userData?.token) fetchForum();
  }, [forumId, userData?.token]);

  const getFirstLetter = (name) => name?.charAt(0).toUpperCase();

  if (!forum) return <div>Loading...</div>;

  return (
    <div className="forumpage-wrapper">
      {/* Top Navigation */}
      <div className="top-nav">
      <span className="back-arrow" onClick={() => window.history.back()}>&larr;</span>
      <h2>{forum.forum_name}</h2>
      <div className="user-circle">{getFirstLetter(userData.name)}</div>
      </div>

      {/* Main Layout */}
      <div className="forum-layout">
        {/* Sidebar */}
        <div className="sidebar">
          <ul>
            <li
              className={activeSection === 'posts' ? 'active' : ''}
              onClick={() => navigate(`/forum/${forumId}/posts`)}
            >
              Posts
            </li>
            <li
              className={activeSection === 'members' ? 'active' : ''}
              onClick={() => navigate(`/forum/${forumId}/members`)}
            >
              Members
            </li>
            <li
              className={activeSection === 'settings' ? 'active' : ''}
              onClick={() => navigate(`/forum/${forumId}/settings`)}
            >
              Settings
            </li>
          </ul>
 
          <div className="channel-title">Channels</div>
          <ul className="channels">
            <li
              className={activeSection === 'general' ? 'active' : ''}
              onClick={() => navigate(`/forum/${forumId}/general`)}
            >
              General
            </li>
            <li
              className={activeSection === 'announcements' ? 'active' : ''}
              onClick={() => navigate(`/forum/${forumId}/announcements`)}
            >
              Announcements
            </li>
            <li
              className={activeSection === 'news' ? 'active' : ''}
              onClick={() => navigate(`/forum/${forumId}/news`)}
            >
              News
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="content">
          <div className="empty-post">
            <img
             src="/sss.png"
             alt="clipboard"
             className="clipboard-img"
             />
            <h3>
              Go ahead and create your first post in{' '}
              <span className="channel-highlight">General</span>
            </h3>
            <p className="post-subtext">
              Let other people know what is going on your mind
            </p>
            <button className="new-post-btn">New Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPage;