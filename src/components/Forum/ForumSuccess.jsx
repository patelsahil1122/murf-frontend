import React from 'react'
import { useNavigate } from 'react-router-dom'
import './ForumSuccess.css'
import ReusableButton from '../ReusableComponents/ReusableButton';

const ForumSuccess = ({ forumName }) => {
  const navigate = useNavigate()
  const currentDate = new Date().toLocaleDateString()

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="balloon-icon">
          <img
            src="/balloon-icon.png" 
            alt="Celebration Balloon"
            className="celebration-icon"
          />
        </div>
        
        <h1 className="success-title">Congratulations</h1>
        
        <p className="success-message">
          You have successfully created your forum <strong>{forumName}</strong>
          <br />
          on {currentDate}. Go ahead and create your first post in the forum
        </p>

        <ReusableButton
            onClick={() => navigate('/list-forum')}
            className="manage-button"
            text="Manage your forum"
          />
        
      </div>
    </div>
  )
}

export default ForumSuccess