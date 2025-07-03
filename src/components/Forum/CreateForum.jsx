import React, { useState } from 'react';
import axios from 'axios';
import './CreateForum.css';
import ForumSuccess from './ForumSuccess';
import ReusableButton from '../ReusableComponents/ReusableButton';
import ReusableInput from '../ReusableComponents/ReusableInput';
import ReusableFormCard from '../ReusableComponents/ReusableFormCard';

const CreateForum = () => {
  const [step, setStep] = useState(1);
  const [forumName, setForumName] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (forumName) {
      setStep(2);
    }
  };

  const handleCreateForum = async () => {
    if (forumName && selectedTheme) {
      try {
        setError('');
        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = userData.token;
        const userId = userData.id;

        const response = await axios.post(
          'http://localhost:5000/forums/create-forum',
          {
            forum_name: forumName,
            theme: selectedTheme,
            userId: userId,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              authToken: token,
            },
          }
        );

        localStorage.setItem('forumData', JSON.stringify(response.data));
        setIsSuccess(true);
      } catch (err) {
        setError(
          err.response?.data?.message || 'Failed to create forum. Please try again.'
        );
      }
    }
  };

  if (isSuccess) {
    return <ForumSuccess forumName={forumName} />;
  }

  return (
    <div className="create-forum-container">
      <div className="create-forum-card">
        <ReusableFormCard
          title="Create your Forum"
          subtitle="Create your forum in two simple steps"
          titleClass="title"
          subtitleClass="subtitle"
        >
          <div className="steps-container">
            <div className={`step ${step >= 1 ? 'active' : ''}`}>
              <div className={`step-number ${forumName ? 'completed' : ''}`}>
                {forumName ? '✓' : '01'}
              </div>
              <div className="step-content">
                <h2>Enter Name of Forum</h2>
                <ReusableInput
                  type="text"
                  placeholder="Forum Name"
                  value={forumName}
                  onChange={(e) => setForumName(e.target.value)}
                  className="forum-input"
                />
                {step === 1 && (
                  <ReusableButton
                    onClick={handleNext}
                    disabled={!forumName}
                    className={`next-button ${forumName ? 'filled' : ''}`}
                    text="Next"
                  />
                )}
              </div>
            </div>

            <div className={`step ${step === 2 ? 'active' : ''}`}>
              <div className={`step-number ${selectedTheme ? 'completed' : ''}`}>
                {selectedTheme ? '✓' : '02'}
              </div>
              <div className="step-content">
                <h2>Select a Theme for the forum</h2>
                {step === 2 ? (
                  <div className="theme-buttons">
                    {['green', 'blue', 'orange', 'grey'].map((theme) => (
                      <button
                        key={theme}
                        className={`theme-button ${selectedTheme === theme ? 'selected' : ''}`}
                        onClick={() => setSelectedTheme(theme)}
                      >
                        {theme.charAt(0).toUpperCase() + theme.slice(1)}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div style={{ height: '100px' }} />
                )}
                {error && <div className="error-message">{error}</div>}
                <ReusableButton
                  onClick={handleCreateForum}
                  className="create-button"
                  text="Create Forum"
                />
              </div>
            </div>
          </div>
        </ReusableFormCard>
      </div>
    </div>
  );
};

export default CreateForum;