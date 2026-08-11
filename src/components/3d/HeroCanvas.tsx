'use client';

import React, { useState, useEffect, Component, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import ParticleField from './ParticleField';

interface HeroCanvasProps {
  className?: string;
}

// WebGL Error Boundary to catch R3F / Canvas context failures gracefully
interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn('WebGL Context Error in HeroCanvas, falling back to 2D gradient:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// 2D CSS Gradient Fallback Component for Touch / No-WebGL
const GradientFallback: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#050508] ${className}`}>
      {/* Radial ambient glow orbs */}
      <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-[#00f3ff]/20 rounded-full blur-[140px] animate-pulse pointer-events-none" />
      <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-[#9d00ff]/20 rounded-full blur-[140px] animate-pulse pointer-events-none" style={{ animationDelay: '1.5s' }} />
      
      {/* Animated floating subtle CSS particles */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#00f3ff_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Central atmospheric mesh gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#050508] via-[#050508]/80 to-[#9d00ff]/10 pointer-events-none" />
    </div>
  );
};

export const HeroCanvas: React.FC<HeroCanvasProps> = ({ className = '' }) => {
  const [mounted, setMounted] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Detect WebGL capability and coarse pointer (touch screen)
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      
      if (!gl || isTouch) {
        setIsSupported(false);
      }
    } catch {
      setIsSupported(false);
    }
  }, []);

  if (!mounted) {
    return <GradientFallback className={className} />;
  }

  if (!isSupported) {
    return <GradientFallback className={className} />;
  }

  return (
    <div className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}>
      <WebGLErrorBoundary fallback={<GradientFallback className={className} />}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 60 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            failIfMajorPerformanceCaveat: false,
          }}
          dpr={[1, 2]}
          className="w-full h-full"
        >
          {/* Ambient lighting with Cyan and Purple accents */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 10]} intensity={0.8} color="#ffffff" />
          <pointLight position={[-8, 6, 4]} intensity={2.5} color="#00f3ff" distance={20} />
          <pointLight position={[8, -6, 4]} intensity={2.5} color="#9d00ff" distance={20} />

          {/* R3F Instanced Particle Field */}
          <ParticleField count={1800} colorCyan="#00f3ff" colorPurple="#9d00ff" />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
};

export default HeroCanvas;
