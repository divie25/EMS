import React from 'react';

const Homepage = () => {
  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    textAlign: 'center',
  };

  const sectionStyle = {
    marginBottom: '20px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  const headingStyle = {
    color: '#4CAF50',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to EcoApp</h1>
      <p>Explore environmental data, initiatives, and resources to make a difference.</p>
      
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Featured Articles</h2>
        <ul>
          <li>10 Ways to Reduce Carbon Footprint</li>
          <li>The Importance of Recycling</li>
          <li>How to Save Water in Daily Life</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Upcoming Events</h2>
        <ul>
          <li>Tree Planting Drive - 15th March</li>
          <li>Beach Cleanup Campaign - 20th March</li>
          <li>Earth Day Awareness Program - 22nd April</li>
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Quick Tips</h2>
        <p>1. Switch to reusable bags and bottles.</p>
        <p>2. Use public transportation to reduce emissions.</p>
        <p>3. Segregate waste for efficient recycling.</p>
      </div>

      <div style={sectionStyle}>
        <h2 style={headingStyle}>Join the Movement</h2>
        <p>Become a volunteer and contribute to our environmental initiatives. Together, we can make a difference!</p>
        <button style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Sign Up Now
        </button>
      </div>
    </div>
  );
};

export default Homepage;
