import React, { useEffect, useState } from 'react';
import './ListForum.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import ReusableNavLink from '../ReusableComponents/ReusableNavLink';

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
      <header className="listforum-header">
        <div className="user-icon">{getFirstLetter(userData.name)}</div>
      </header>

      <div className="forum-title">
        <h1>Forums</h1>
      <ReusableNavLink 
            to="/create-forum" 
            className="createforum-link"
            label="CreateForum"
            // onClick={handleSignupClick}
          />
        
      </div>
      
      <div className="forum-list">
      {Array.isArray(forums) && forums.length > 0 ? (
       forums.map((forum, index) => (
      <NavLink
        key={index}
        to={`/forum/${forum._id}/posts`}
        className="forum-card-link" 
      >
      
        <div className="forum-card">
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
      </NavLink>
    ))
  ) : (
    <p className="no-forum-msg">No forums found.</p>
  )}
</div>
    </div>
  );
};

export default ListForum;