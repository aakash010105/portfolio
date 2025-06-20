// landingpage.jsx
import React from 'react';
import UserCard from '../../components/UserCard';
import NewUserCard from '../../components/NewUserCard';
import { useNavigate } from 'react-router-dom';

const users = [
  {
    name: 'New User',
    img: '/newuser.png',
  },
  {
    name: 'Aakash Jindal',
    img: '/aakash.jpg',
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  const handleUserClick = (user) => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Top-left Logo */}
      <img
        src="/logo.png"
        alt="Logo"
        style={{
          position: 'absolute',
          top: '-75px',
          left: '80px',
          width: '300px',
          height: '300px',
          objectFit: 'contain',
          zIndex: 10,
          filter: 'invert(1)',
        }}
      />

      {/* Middle Text */}
      <div
        className="text-lg font-light max-w-[700px] px-8 z-10 text-left"
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '23px',
          color: 'white',
        }}
      >
        🎮 DUALSHOCK™ 4 wireless controller connected. <br />
        Who is using this controller?
      </div>

      {/* User Cards */}
      <div
        className="p-6 rounded-md flex items-center space-x-8 z-10"
        style={{
          position: 'absolute',
          top: '56%',
          left: '56%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {users.map((user, index) =>
          user.name === 'New User' ? (
            <NewUserCard
              key={index}
              name={user.name}
              imgSrc={user.img}
              onClick={() => handleUserClick(user)}
              className="mx-1"
            />
          ) : (
            <UserCard
              key={index}
              name={user.name}
              imgSrc={user.img}
              onClick={() => handleUserClick(user)}
              className="mx-4"
            />
          )
        )}
      </div>
    </div>
  );
};

export default LandingPage;
