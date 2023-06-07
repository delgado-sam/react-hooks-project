import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { FaUserFriends, FaFighterJet, FaTrophy, FaTimesCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ThemeContext from '../contexts/theme';

function Instructions() {
  const theme = useContext(ThemeContext);

  return (
    <div className='instructions-container'>
      <h1 className='center-text header-lg'>Instructions</h1>
      <ol className='container-sm grid center-text battle-instructions'>
        <li>
          <h3 className='header-sm'>Enter two github users</h3>
          <FaUserFriends className={`bg-${theme}`} color='pink' size={140} />
        </li>
        <li>
          <h3 className='header-sm'>Fight or die</h3>
          <FaFighterJet className={`bg-${theme}`} color='purple' size={140} />
        </li>
        <li>
          <h3 className='header-sm'>See the winner!</h3>
          <FaTrophy className={`bg-${theme}`} color='gold' size={140} />
        </li>
      </ol>
    </div>
  );
}

function PlayerInput({ onSubmit, label }) {
  const [username, setUsername] = useState('');
  const theme = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username);
  };

  const handleChange = (event) => setUsername(event.target.value);

  return (
    <form className='column player' onSubmit={handleSubmit}>
      <label htmlFor='username' className='player-label'>
        {label}
      </label>
      <div className='row player-inputs'>
        <input
          type='text'
          id='username'
          className={`input-${theme}`}
          placeholder='github username'
          autoComplete='off'
          value={username}
          onChange={handleChange}
        />
        <button
          className={`btn ${theme === 'dark' ? 'light-btn' : 'dark-btn'}`}
          type='submit'
          disabled={!username}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

function PlayerPreview({ username, onReset, label }) {
  const theme = useContext(ThemeContext);

  return (
    <div className='column player'>
      <h3 className='player-label'>{label}</h3>
      <div className={`row bg-${theme}`}>
        <div className='player-info'>
          <img
            className='avatar-small'
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
          />
          <a href={`https://github.com/${username}`} className='link'>
            {username}
          </a>
        </div>
        <button className='btn-clear flex-center' onClick={onReset}>
          <FaTimesCircle color='##d71868' size={26} />
        </button>
      </div>
    </div>
  );
}

PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default function Battle() {
  const [playerOne, setPlayerOne] = useState(null);
  const [playerTwo, setPlayerTwo] = useState(null);

  const handleSubmit = (id, player) => {
    if (id === 'playerOne') {
      setPlayerOne(player);
    } else if (id === 'playerTwo') {
      setPlayerTwo(player);
    }
  };

  const handleReset = (id) => {
    if (id === 'playerOne') {
      setPlayerOne(null);
    } else if (id === 'playerTwo') {
      setPlayerTwo(null);
    }
  };

  return (
    <>
      <Instructions />
      <div className='players-container'>
        <h1 className='center-text header-lg'>Players</h1>
        <div className='row space-around'>
          {playerOne === null ? (
            <PlayerInput
              label='Player One'
              onSubmit={(player) => handleSubmit('playerOne', player)}
            />
          ) : (
            <PlayerPreview
              username={playerOne}
              label='Player One'
              onReset={() => handleReset('playerOne')}
            />
          )}
          {playerTwo === null ? (
            <PlayerInput
              label='Player Two'
              onSubmit={(player) => handleSubmit('playerTwo', player)}
            />
          ) : (
            <PlayerPreview
              username={playerTwo}
              label='Player Two'
              onReset={() => handleReset('playerTwo')}
            />
          )}
        </div>
        {playerOne && playerTwo && (
          <Link
            className='btn dark-btn btn-space'
            to={{
              pathname: '/battle/results',
              search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
            }}
          >
            FIGHT!
          </Link>
        )}
      </div>
    </>
  );
}
