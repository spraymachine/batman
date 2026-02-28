import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from 'three';
import Sun3D from './Sun3D';
import Moon3D from './Moon3D';

/**
 * Loading fallback - simple sphere placeholders while models load
 */
function LoadingFallback() {
  return (
    <>
      {/* Sun placeholder - glowing sphere */}
      <group position={[-2, 3, 0]}>
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#ffd700" emissive="#ff6b35" emissiveIntensity={0.5} />
        </mesh>
      </group>
      {/* Moon placeholder - grey sphere */}
      <group position={[2, 3, 0]}>
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial color="#c0c0c0" emissive="#909090" emissiveIntensity={0.3} />
        </mesh>
      </group>
    </>
  );
}

/**
 * 3D Scene Component
 * Simplified lighting setup - no Environment preset to avoid weird reflections
 */
export default function Scene3D() {
  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 99999,
        pointerEvents: 'none',
      }}
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ 
        antialias: true, 
        alpha: true, 
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2
      }}
    >
      {/* Simple, clean lighting setup */}
      <ambientLight intensity={1.2} color="#ffffff" />
      
      {/* Main light from top-right */}
      <directionalLight 
        position={[5, 8, 5]} 
        intensity={2.5} 
        color="#ffffff"
        castShadow={false}
      />
      
      {/* Fill light from opposite side */}
      <directionalLight 
        position={[-3, 2, 3]} 
        intensity={1} 
        color="#e8f4f8"
        castShadow={false}
      />
      
      {/* Subtle rim light */}
      <directionalLight 
        position={[-5, -2, -5]} 
        intensity={0.5} 
        color="#b0c4de"
        castShadow={false}
      />

      {/* Suspense boundary - shows fallback while models load */}
      <Suspense fallback={<LoadingFallback />}>
        {/* Sun 3D Model - Start left, above viewport */}
        <Sun3D position={[-2, 3, 0]} scale={1} />

        {/* Moon 3D Model - Start right, above viewport */}
        <Moon3D position={[2, 3, 0]} scale={1} />
      </Suspense>
    </Canvas>
  );
}
