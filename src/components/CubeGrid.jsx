import Cube from './Cube';

/**
 * CubeGrid Component
 * Manages the layout of portfolio cubes
 * 6 from left, 6 from right = 12 total projects
 */
export default function CubeGrid() {
  // Portfolio projects data - SPACE THEME
  const projects = [
    { name: 'E-Commerce Platform', color1: '#00ff87', color2: '#00d4ff' },
    { name: 'AI Dashboard', color1: '#b794f6', color2: '#00ff87' },
    { name: 'Mobile Banking App', color1: '#ffd700', color2: '#ff6b35' },
    { name: 'SaaS Analytics', color1: '#00d4ff', color2: '#b794f6' },
    { name: 'Social Platform', color1: '#00ff87', color2: '#ffd700' },
    { name: 'Health Tracker', color1: '#ff6b35', color2: '#00d4ff' },
    { name: 'Crypto Wallet', color1: '#b794f6', color2: '#ffd700' },
    { name: 'CMS Builder', color1: '#00ff87', color2: '#ff6b35' },
    { name: 'Video Streaming', color1: '#00d4ff', color2: '#ffd700' },
    { name: 'Travel Booking', color1: '#ffd700', color2: '#00ff87' },
    { name: 'EdTech Platform', color1: '#ff6b35', color2: '#b794f6' },
    { name: 'IoT Dashboard', color1: '#00ff87', color2: '#00d4ff' },
  ];

  // Split projects: 6 from left, 6 from right
  const leftProjects = projects.slice(0, 6);
  const rightProjects = projects.slice(6, 12);

  return (
    <div
      className="cube-grid"
      style={{
        perspective: '1200px',
        perspectiveOrigin: 'center center',
        display: 'flex',
        flexDirection: 'column',
        gap: '60px', // Increased from 40px
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px 120px 20px', // Extra bottom padding
        minHeight: '100vh', // Ensure minimum height
      }}
    >
      {/* Interleave left and right cubes for better visual flow */}
      {leftProjects.map((project, index) => (
        <div key={`row-${index}`} style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Cube project={leftProjects[index]} side="left" index={index} />
          {rightProjects[index] && (
            <Cube project={rightProjects[index]} side="right" index={index} />
          )}
        </div>
      ))}
    </div>
  );
}

