import React, { useState } from 'react'
import axios from 'axios'
import './CreateForum.css'
import ForumSuccess from './ForumSuccess'
import ReusableButton from '../ReusableComponents/ReusableButton'
import ReusableNavLink from '../ReusableComponents/ReusableNavLink'

const CreateForum = () => {
  const [step, setStep] = useState(1)
  const [forumName, setForumName] = useState('')
  const [selectedTheme, setSelectedTheme] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleNext = () => {
    if (forumName) {
      setStep(2)
    }
  }

  const handleCreateForum = async () => {
    if (forumName && selectedTheme) {
      try {
        setError('')
        const token = JSON.parse(localStorage.getItem('userData')).token
        const userId = JSON.parse(localStorage.getItem('userData')).id

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
               authToken : token
            }
          }
        )
        // Store forum data in localStorage
        localStorage.setItem('forumData', JSON.stringify(response.data));
        setIsSuccess(true)  
        
      } catch (err) {
        setError(
          err.response?.data?.message ||
          'Failed to create forum. Please try again.'
        )
      }
    }
  }

  if (isSuccess) {
    return <ForumSuccess forumName={forumName} />
  }

  return (
    <div className="create-forum-container">
      <div className="create-forum-card">
        <h1 className="title">Create your Forum</h1>
        <p className="subtitle">Create your forum in two simple steps</p>

        <div className="steps-container">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <div className={`step-number ${forumName ? 'completed' : ''}`}>
              {forumName ? '✓' : '01'}
            </div>
            <div className="step-content">
              <h2>Enter Name of Forum</h2>
              <input
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

          {/* Step 2 */}
          <div className={`step ${step === 2 ? 'active' : ''}`}>
            <div className={`step-number ${selectedTheme ? 'completed' : ''}`}>
              {selectedTheme ? '✓' : '02'}
            </div>
            <div className="step-content">
              <h2>Select a Theme for the forum</h2>
              {step === 2 ? (
                <div className="theme-buttons">
                  <button 
                    className={`theme-button ${selectedTheme === 'green' ? 'selected' : ''}`}
                    onClick={() => setSelectedTheme('green')}
                  >
                    Green
                  </button>
                  <button 
                    className={`theme-button ${selectedTheme === 'blue' ? 'selected' : ''}`}
                    onClick={() => setSelectedTheme('blue')}
                  >
                    Blue
                  </button>
                  <button 
                    className={`theme-button ${selectedTheme === 'orange' ? 'selected' : ''}`}
                    onClick={() => setSelectedTheme('orange')}
                  >
                    Orange
                  </button>
                  <button 
                    className={`theme-button ${selectedTheme === 'grey' ? 'selected' : ''}`}
                    onClick={() => setSelectedTheme('grey')}
                  >
                    Grey
                  </button>
                </div>
              ) : (
                // This empty div keeps the box size the same when buttons are hidden
                <div style={{height: '100px'}} />
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
      </div>
    </div>
  )
}

export default CreateForum