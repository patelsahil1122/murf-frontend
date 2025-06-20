import React, { useEffect, useState } from 'react';
import './ListForum.css';
import axios from 'axios';

const ListForum = () => {
  const [forums, setForums] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${userData.id}/forums`,
          {
            headers: {
              authToken: userData.token,
            },
          }
        );

        
        setForums(response.data?.data || []);
      } catch (error) {
        console.error('Error fetching forums:', error);
        setForums([]); // Prevent crash
      }
    };

    if (userData?.id && userData?.token) {
      fetchForums();
    }
  }, []);

  const getFirstLetter = (name) => name?.charAt(0).toUpperCase();

  return (
    <div className="listforum-container">
      {/* Top Right User Initial */}
      <header className="listforum-header">
        <div className="user-icon">{getFirstLetter(userData.name)}</div>
      </header>

      <h2 className="forum-title">Forums</h2>

      <div className="forum-list">
        {Array.isArray(forums) && forums.length > 0 ? (
          forums.map((forum, index) => (
            <div className="forum-card" key={index}>
              <div className="forum-left">
                <h3>{forum.forum_name}</h3>
                <p className="created-by">
                  Created by <strong>{forum.createdBy?.name || userData.name}</strong>
                </p>
              </div>

              <div className="forum-right">
                <p className="theme-text">{forum.theme}</p>
                <div className="user-icon-box">
                  <div className="user-initial-circle">
                    {getFirstLetter(forum.createdBy?.name || userData.name)}
                  </div>
                  <span className="user-fullname">
                    {forum.createdBy?.name || userData.name}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-forum-msg">No forums found.</p>
        )}
      </div>
    </div>
  );
};

export default ListForum;