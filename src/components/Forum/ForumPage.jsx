// ForumPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MembersContent from '../Post/MembersContent';
import SettingsContent from '../Post/SettingsContent';
import GeneralContent from '../Post/GeneralContent';
import AnnouncementsContent from '../Post/AnnouncementsContent';
import NewsContent from '../Post/NewsContent';
import './ForumPage.css';

const ForumPage = () => {
  const { forumId, section } = useParams();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [forum, setForum] = useState(null);

  const activeSection = section?.toLowerCase();

  useEffect(() => {
    const fetchForum = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/forums/${forumId}`, {
          headers: {
            authToken: userData.token
          }
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

  const isChannelSection = ['general', 'announcements', 'news'].includes(activeSection);

  return (
    <div className="forumpage-wrapper">
      <div className="top-nav">
        <span className="back-arrow" onClick={() => window.history.back()}>&larr;</span>
        <h2>{forum.forum_name}</h2>
        <div className="user-circle">{getFirstLetter(userData.name)}</div>
      </div>

      <div className="forum-layout">
        <div className="sidebar">
          <ul>
            <li
              className={isChannelSection || activeSection === 'posts' ? 'active' : ''}
              onClick={() => navigate(`/forum/${forumId}/general`)}
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

          {activeSection !== 'members' && activeSection !== 'settings' && (
            <>
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
            </>
          )}
        </div>

        <div className="content">
          {activeSection === 'members' && <MembersContent />}
          {activeSection === 'settings' && <SettingsContent />}
          {activeSection === 'general' && <GeneralContent />}
          {activeSection === 'announcements' && <AnnouncementsContent />}
          {activeSection === 'news' && <NewsContent />}
        </div>
      </div>
    </div>
  );
};

export default ForumPage;