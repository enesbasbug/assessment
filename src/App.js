import logo from './logo.svg';
import './App.css';
import React, { useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar'; // Import the Sidebar component
import './Sidebar.css';



const App = () => {
  const [rotateLogo, setRotateLogo] = useState(true);
  const [iconSize, setIconSize] = useState(200);
  const [time, setTime] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isRotationEnabled, setIsRotationEnabled] = useState(true);
  const [isIconSizeEnabled, setIsIconSizeEnabled] = useState(true);
  const [isMouseIdleTimeEnabled, setIsMouseIdleTimeEnabled] = useState(true);
  const timer = useRef(null);

  const toggleRotation = () => {
    setRotateLogo(!rotateLogo);
  };

  const toggleMouseIdleTime = () => {
    setTime(0); // Reset the time to 0
  };

  const handleMouse = (e) => {
    if (isIconSizeEnabled) {
      const newSize = 200 + (e.clientX / window.innerWidth) * 500;
      setIconSize(newSize);
    }

    if (isMouseIdleTimeEnabled) {
      // If the mouse moves, reset the timer
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        toggleMouseIdleTime();
      }, 1000);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouse);
    const interval = setInterval(() => {
      if (isMouseIdleTimeEnabled) {
        setTime((prevTime) => prevTime + 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  },);

  return (
    <div className="App">
        {isSidebarOpen && (
          <div className='sidebar'>
            
              <Sidebar
                onToggleRotation={() => setIsRotationEnabled(!isRotationEnabled)}
                onToggleIconSize={() => setIsIconSizeEnabled(!isIconSizeEnabled)}
                onToggleMouseIdleTime={() => setIsMouseIdleTimeEnabled(!isMouseIdleTimeEnabled)}
                isRotationEnabled={isRotationEnabled}
                isIconSizeEnabled={isIconSizeEnabled}
                isMouseIdleTimeEnabled={isMouseIdleTimeEnabled}
              />
          </div>
          )}
      
      <header className="App-header">
        <img
          src={logo}
          className={`App-logo ${isRotationEnabled ? (rotateLogo ? 'rotate' : 'rotate-reverse') : 'rotate'}`}
          alt="logo"
          onClick={isRotationEnabled ? toggleRotation : null}
          style={{ width: isIconSizeEnabled ? iconSize : 200, height: isIconSizeEnabled ? iconSize : 200 }}
        />
        <p>Time: {time} seconds</p>

        <button className="sidebar-button" onClick={toggleSidebar}>
          {isSidebarOpen ? 'Close Sidebar' : 'Open Sidebar'}
        </button>
      </header>

    </div>
  );
};

export default App;
