import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Network } from 'lucide-react';

interface TechNode {
  id: string;
  name: string;
  category: 'AI' | 'Data' | 'Frontend' | 'Vision' | 'Core';
  x: number; // percentage (10 to 90)
  y: number; // percentage (15 to 85)
  size: 'sm' | 'md' | 'lg';
  description: string;
}

const TECH_NODES: TechNode[] = [
  { id: 'ai', name: 'AI', category: 'AI', x: 22, y: 28, size: 'lg', description: 'Autonomous reasoning, LLM pipelines & agentic synthesis' },
  { id: 'ml', name: 'ML', category: 'AI', x: 38, y: 20, size: 'md', description: 'Custom neural architectures, fine-tuning & edge models' },
  { id: 'data', name: 'DATA', category: 'Data', x: 18, y: 55, size: 'lg', description: 'High-throughput stream processing & vector databases' },
  { id: 'python', name: 'PYTHON', category: 'Core', x: 34, y: 44, size: 'md', description: 'High-performance AI/ML backends, PyTorch & OpenCV' },
  { id: 'nextjs', name: 'NEXT.JS', category: 'Frontend', x: 62, y: 24, size: 'lg', description: 'Server-side rendering, edge caching & React 19' },
  { id: 'react', name: 'REACT', category: 'Frontend', x: 78, y: 35, size: 'md', description: 'Component ecosystems, reactive state & fluid UX' },
  { id: 'javascript', name: 'JAVASCRIPT', category: 'Frontend', x: 82, y: 58, size: 'sm', description: 'Native web platform, V8 engine & async concurrency' },
  { id: 'vision', name: 'COMPUTER VISION', category: 'Vision', x: 48, y: 72, size: 'lg', description: 'Real-time spatial detection & 21-landmark skeletal tracking' },
  { id: 'uiux', name: 'UI / UX', category: 'Frontend', x: 68, y: 68, size: 'md', description: 'Human-centered interfaces, spatial layout & kinetic micro-interactions' },
  { id: 'web', name: 'WEB', category: 'Frontend', x: 52, y: 38, size: 'sm', description: 'High-fidelity browser experiences with 100/100 Core Web Vitals' },
  { id: 'apps', name: 'APPS', category: 'Core', x: 74, y: 82, size: 'md', description: 'Cross-platform progressive web apps & native performance' },
  { id: 'automation', name: 'AUTOMATION', category: 'Core', x: 30, y: 80, size: 'md', description: 'Headless workflows, queue workers & zero-latency execution' },
];

export const TechnologyConstellation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<TechNode | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    const node = containerRef.current;
    if (node) {
      node.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (node) node.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section
      id="technology"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 py-32 border-b border-white/[0.06] select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header Metadata */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-slate-400 uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span>SCENE 09 / TECHNOLOGY CONSTELLATION</span>
            </div>
            <h2 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-[-0.03em] text-white uppercase">
              DYNAMIC ECOSYSTEM
            </h2>
          </div>

          <div className="font-mono text-xs text-slate-400 uppercase tracking-widest max-w-sm sm:text-right">
            <span>SPATIAL NODE CLOUD</span>
            <span className="block text-[10px] text-cyan-400 mt-1">INTERCONNECTED CAPABILITIES</span>
          </div>
        </div>

        {/* Spatial Interactive Canvas */}
        <div
          ref={containerRef}
          className="relative w-full h-[520px] sm:h-[620px] rounded-3xl bg-white/[0.015] border border-white/[0.08] backdrop-blur-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
        >
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-950/5 to-transparent pointer-events-none" />

          {/* SVG Connecting Lines between nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
            {TECH_NODES.map((source, i) =>
              TECH_NODES.slice(i + 1).map((target) => {
                const distance = Math.hypot(source.x - target.x, source.y - target.y);
                if (distance > 38) return null; // only connect nearby nodes

                const isConnectedToHovered =
                  hoveredNode && (hoveredNode.id === source.id || hoveredNode.id === target.id);

                return (
                  <line
                    key={`${source.id}-${target.id}`}
                    x1={`${source.x}%`}
                    y1={`${source.y}%`}
                    x2={`${target.x}%`}
                    y2={`${target.y}%`}
                    stroke={isConnectedToHovered ? '#38bdf8' : 'rgba(255,255,255,0.2)'}
                    strokeWidth={isConnectedToHovered ? 1.5 : 0.75}
                    strokeDasharray={isConnectedToHovered ? 'none' : '3 4'}
                    className="transition-all duration-300"
                  />
                );
              })
            )}
          </svg>

          {/* Interactive Floating Tech Nodes */}
          {TECH_NODES.map((node) => {
            const isHovered = hoveredNode?.id === node.id;
            const isConnected =
              hoveredNode &&
              Math.hypot(node.x - hoveredNode.x, node.y - hoveredNode.y) < 38;

            // Parallax offset
            const parallaxX = mousePos.x * 24;
            const parallaxY = mousePos.y * 24;

            return (
              <motion.div
                key={node.id}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  x: parallaxX,
                  y: parallaxY,
                }}
                onMouseEnter={() => setHoveredNode(node)}
                onMouseLeave={() => setHoveredNode(null)}
                animate={{
                  scale: isHovered ? 1.2 : isConnected ? 1.05 : 1,
                  y: [0, -6, 0],
                }}
                transition={{
                  scale: { duration: 0.25 },
                  y: { repeat: Infinity, duration: 4 + (node.x % 3), ease: 'easeInOut' },
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group`}
                data-cursor="EXPLORE"
              >
                <div
                  className={`px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl border backdrop-blur-2xl transition-all duration-300 shadow-xl flex items-center gap-2.5 ${
                    isHovered
                      ? 'bg-white text-black border-cyan-400 shadow-[0_0_30px_rgba(56,189,248,0.6)]'
                      : isConnected
                      ? 'bg-white/[0.08] text-white border-cyan-400/60 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
                      : 'bg-[#0a0d13]/90 text-slate-200 border-white/10 hover:border-white/30'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isHovered
                        ? 'bg-cyan-500'
                        : isConnected
                        ? 'bg-cyan-400'
                        : 'bg-white/40'
                    }`}
                  />
                  <span
                    className={`font-mono tracking-wider uppercase font-bold ${
                      node.size === 'lg'
                        ? 'text-xs sm:text-sm'
                        : node.size === 'md'
                        ? 'text-[11px] sm:text-xs'
                        : 'text-[10px]'
                    }`}
                  >
                    {node.name}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {/* Bottom Active Inspector Bar */}
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#080b11]/90 border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pointer-events-none">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  {hoveredNode ? hoveredNode.name : 'MAKEWEBB COMPUTATIONAL STACK'}
                </div>
                <div className="font-sans text-xs text-slate-400 mt-0.5">
                  {hoveredNode
                    ? hoveredNode.description
                    : 'Hover any node in the constellation to trace interconnected telemetry and architectures.'}
                </div>
              </div>
            </div>

            <div className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest hidden md:block">
              {hoveredNode ? `DOMAIN: ${hoveredNode.category}` : '12 NODES ONLINE'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
