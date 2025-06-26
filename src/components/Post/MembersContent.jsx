import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Memberscontent.css';

const MembersContent = () => {
  const { forumId } = useParams();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/forums/${forumId}/members`, {
          headers: {
            authToken: userData.token,
          },
        });
        setMembers(res.data.data);
      } catch (error) {
        console.error('Failed to fetch members', error);
      }
    };

    if (forumId && userData?.token) fetchMembers();
  }, [forumId, userData?.token]);

  const getFirstLetter = (name) => name?.charAt(0).toUpperCase();

  return (
    <div className="members-page">
      <h2>Members</h2>
      <div className="members-list">
        {members.map((member) => (
          <div className="member-card" key={member._id}>
            <div className="avatar-circle">{getFirstLetter(member.name)}</div>
            <div className="member-details">
              <div className="member-name">{member.name}</div>
              <div className="member-email">{member.email}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="add-member">
        <button className="add-btn">+</button>
      </div>
    </div>
  );
};

export default MembersContent;