import Cube from './Cube';

/**
 * CubeGrid Component
 * Manages the layout of portfolio cubes - cosmic crystal shards
 * 6 from left, 6 from right = 12 total projects
 */
const ACCENT_PALETTE = [
  '0, 255, 135',    // aurora green
  '0, 212, 255',    // aurora blue
  '183, 148, 246',  // aurora purple
  '255, 179, 71',   // warm amber
  '255, 107, 107',  // coral red
  '100, 220, 255',  // ice blue
  '255, 200, 87',   // golden
  '147, 255, 159',  // mint green
  '220, 130, 255',  // violet
  '255, 140, 60',   // solar orange
  '130, 200, 255',  // sky blue
  '255, 100, 180',  // nebula pink
];

export default function CubeGrid() {
  const projects = [
    { name: 'E-Commerce Platform' },
    { name: 'AI Dashboard' },
    { name: 'Mobile Banking App' },
    { name: 'SaaS Analytics' },
    { name: 'Social Platform' },
    { name: 'Health Tracker' },
    { name: 'Crypto Wallet' },
    { name: 'CMS Builder' },
    { name: 'Video Streaming' },
    { name: 'Travel Booking' },
    { name: 'EdTech Platform' },
    { name: 'IoT Dashboard' },
  ];

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
        gap: '60px',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px 120px 20px',
        minHeight: '100vh',
      }}
    >
      {leftProjects.map((project, index) => (
        <div key={`row-${index}`} style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Cube
            project={leftProjects[index]}
            side="left"
            index={index}
            cubeIndex={index * 2}
            accentRGB={ACCENT_PALETTE[index]}
          />
          {rightProjects[index] && (
            <Cube
              project={rightProjects[index]}
              side="right"
              index={index}
              cubeIndex={index * 2 + 1}
              accentRGB={ACCENT_PALETTE[6 + index]}
            />
          )}
        </div>
      ))}
    </div>
  );
}

