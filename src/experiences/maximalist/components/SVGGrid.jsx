import { useEffect, useRef } from 'react';

/**
 * Interactive SVG node grid that reacts to mouse movement.
 * Renders a network of connected nodes with proximity-based highlighting.
 */
export default function SVGGrid() {
  const svgRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const nodesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const w = svg.clientWidth;
    const h = svg.clientHeight;
    const cols = Math.floor(w / 60);
    const rows = Math.floor(h / 60);
    const nodes = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        nodes.push({
          x: (c + 0.5) * (w / cols) + (Math.random() - 0.5) * 12,
          y: (r + 0.5) * (h / rows) + (Math.random() - 0.5) * 12,
          ox: 0,
          oy: 0,
          baseR: 1.5 + Math.random(),
        });
      }
    }
    nodesRef.current = nodes;

    // Build SVG elements
    svg.innerHTML = '';

    // Connection lines (only nearby nodes)
    const lines = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        if (Math.sqrt(dx * dx + dy * dy) < 90) {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', nodes[i].x);
          line.setAttribute('y1', nodes[i].y);
          line.setAttribute('x2', nodes[j].x);
          line.setAttribute('y2', nodes[j].y);
          line.setAttribute('stroke', 'rgba(42,49,255,0.12)');
          line.setAttribute('stroke-width', '0.5');
          line.dataset.i = i;
          line.dataset.j = j;
          svg.appendChild(line);
          lines.push(line);
        }
      }
    }

    // Node circles
    const circles = nodes.map((n) => {
      const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('cx', n.x);
      c.setAttribute('cy', n.y);
      c.setAttribute('r', n.baseR);
      c.setAttribute('fill', 'rgba(42,49,255,0.25)');
      svg.appendChild(c);
      return c;
    });

    const onMove = (e) => {
      const rect = svg.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    svg.addEventListener('mousemove', onMove);

    const animate = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const radius = 140;

      nodes.forEach((n, i) => {
        const dx = mx - n.x;
        const dy = my - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / radius);

        // Push nodes away from cursor
        n.ox += (-dx * influence * 0.04 - n.ox) * 0.08;
        n.oy += (-dy * influence * 0.04 - n.oy) * 0.08;

        const cx = n.x + n.ox;
        const cy = n.y + n.oy;
        circles[i].setAttribute('cx', cx);
        circles[i].setAttribute('cy', cy);

        const r = n.baseR + influence * 3;
        circles[i].setAttribute('r', r);

        if (influence > 0.3) {
          circles[i].setAttribute('fill', `rgba(96,211,94,${0.4 + influence * 0.6})`);
        } else if (influence > 0) {
          circles[i].setAttribute('fill', `rgba(42,49,255,${0.25 + influence * 0.5})`);
        } else {
          circles[i].setAttribute('fill', 'rgba(42,49,255,0.25)');
        }
      });

      lines.forEach((line) => {
        const i = parseInt(line.dataset.i);
        const j = parseInt(line.dataset.j);
        const ni = nodes[i];
        const nj = nodes[j];
        line.setAttribute('x1', ni.x + ni.ox);
        line.setAttribute('y1', ni.y + ni.oy);
        line.setAttribute('x2', nj.x + nj.ox);
        line.setAttribute('y2', nj.y + nj.oy);

        const midX = (ni.x + nj.x) / 2;
        const midY = (ni.y + nj.y) / 2;
        const dist = Math.sqrt((mx - midX) ** 2 + (my - midY) ** 2);
        const inf = Math.max(0, 1 - dist / radius);
        if (inf > 0.2) {
          line.setAttribute('stroke', `rgba(96,211,94,${inf * 0.5})`);
          line.setAttribute('stroke-width', `${0.5 + inf * 1.5}`);
        } else {
          line.setAttribute('stroke', 'rgba(42,49,255,0.12)');
          line.setAttribute('stroke-width', '0.5');
        }
      });

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      svg.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
