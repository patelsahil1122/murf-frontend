import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MembersContent from '../Post/MembersContent';
import SettingsContent from '../Post/SettingsContent';
import GeneralContent from '../Post/GeneralContent';
import AnnouncementsContent from '../Post/AnnouncementsContent';
import NewsContent from '../Post/NewsContent';
import './ForumPage.css';
import ReusableButton from '../ReusableComponents/ReusableButton';
import ReusableInput from '../ReusableComponents/ReusableInput';
import ReusableFormCard from '../ReusableComponents/ReusableFormCard';

const ForumPage = () => {
  const { forumId, section } = useParams();
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [forum, setForum] = useState(null);
  const [channels, setChannels] = useState(['General', 'Announcements', 'News']);
  const [showChannelModal, setShowChannelModal] = useState(false);
  const [channelName, setChannelName] = useState('');

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

  const isChannelSection = channels.map(ch => ch.toLowerCase()).includes(activeSection);

  const handleAddChannel = () => {
    if (!channelName.trim()) return;
    setChannels(prev => [...prev, channelName.trim()]);
    setChannelName('');
    setShowChannelModal(false);
  };

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
              <div className="channel-title">
                Channels
                <ReusableButton 
                  className="add-channel-btn" 
                  onClick={() => setShowChannelModal(true)}
                  text={'addChannel'}
                />
              </div>
              <ul className="channels">
                {channels.map((ch) => (
                  <li
                    key={ch}
                    className={activeSection === ch.toLowerCase() ? 'active' : ''}
                    onClick={() => navigate(`/forum/${forumId}/${ch.toLowerCase()}`)}
                  >
                    {ch}
                  </li>
                ))}
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
          {!['members', 'settings', 'general', 'announcements', 'news'].includes(activeSection) && (
            <div style={{ padding: '2rem' }}>No content for this channel yet.</div>
          )}
        </div>
      </div>

      {showChannelModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowChannelModal(false)}>×</button>
            <ReusableFormCard
              title="Enter name of the channel you want to Add"
              titleClass="modal-title"
            >
              <ReusableInput
                type="text"
                placeholder="Channel Name"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                className="modal-input"
              />
              <div className="modal-actions">
                <ReusableButton onClick={() => setShowChannelModal(false)} className="cancel-btn" text="Cancel" />
                <ReusableButton onClick={handleAddChannel} className="add-btn" text="Add Channel" />
              </div>
            </ReusableFormCard>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumPage;