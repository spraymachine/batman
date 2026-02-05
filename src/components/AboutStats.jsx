/**
 * AboutStats Component
 * Displays programming stats that animate in from bottom
 * Scroll-triggered appearance with stagger
 */
export default function AboutStats() {
  const stats = [
    {
      category: 'Languages',
      items: ['JavaScript', 'TypeScript', 'Python', 'Go'],
    },
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'Vue', 'GSAP'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
    },
    {
      category: 'Cloud & Tools',
      items: ['AWS', 'Docker', 'Git', 'Figma'],
    },
  ];

  return (
    <div
      className="stats-container"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '24px',
        padding: '0 20px',
        maxWidth: '900px',
        margin: '0 auto',
      }}
    >
      {stats.map((stat, index) => (
        <div
          key={stat.category}
          className="stat-card will-fade"
          data-stat-index={index}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 255, 135, 0.2), 0 8px 40px rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(0, 255, 135, 0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <h3
            style={{
              fontSize: '18px',
              fontWeight: '600',
              background: 'linear-gradient(135deg, var(--aurora-green), var(--aurora-blue))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '12px',
            }}
          >
            {stat.category}
          </h3>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            {stat.items.map((item) => (
              <li
                key={item}
                style={{
                  fontSize: '14px',
                  color: 'var(--silver-white)',
                  padding: '4px 0',
                  fontWeight: '400',
                  opacity: 0.9,
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}


