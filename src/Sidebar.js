import React from 'react';

const Sidebar = ({ onToggleRotation, onToggleIconSize, onToggleMouseIdleTime }) => {
  return (
    <div className="sidebar">
      <label>
        <input type="checkbox" onChange={onToggleRotation} /> Rotation
      </label>
      <label>
        <input type="checkbox" onChange={onToggleIconSize} /> Icon Size
      </label>
      <label>
        <input type="checkbox" onChange={onToggleMouseIdleTime} /> Mouse Idle Time
      </label>
    </div>
  );
};

export default Sidebar;
