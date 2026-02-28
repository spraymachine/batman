import { useRef, useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Sun 3D Component
 * Loads sun.glb model from public/models/
 * Auto-normalizes scale based on bounding box
 */

// Use Vite base path for model URL
const MODEL_PATH = `${import.meta.env.BASE_URL}models/sun.glb`;

export default function Sun3D({ position = [0, 0, 0], scale = 1 }) {
  const { scene } = useGLTF(MODEL_PATH);
  const groupRef = useRef();

  // Clone scene and normalize its size
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);

    // Calculate bounding box to understand native model size
    const box = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);

    // Log model info for debugging
    console.log('Sun model size:', { x: size.x, y: size.y, z: size.z, maxDim });

    // Normalize: scale the model so its largest dimension = 1 unit
    if (maxDim > 0) {
      const normalizeScale = 1 / maxDim;
      clone.scale.multiplyScalar(normalizeScale);
    }

    // Center the model on its origin
    const center = new THREE.Vector3();
    box.getCenter(center);
    clone.position.sub(center.multiplyScalar(clone.scale.x));

    // Fix materials
    clone.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.side = THREE.FrontSide;

        if (child.material.map) {
          child.material.map.colorSpace = THREE.SRGBColorSpace;
          child.material.map.needsUpdate = true;
        }

        child.material.needsUpdate = true;
      }
    });

    return clone;
  }, [scene]);

  // Expose ref to window for GSAP scroll animations
  useEffect(() => {
    if (groupRef.current) {
      window.sun3DRef = groupRef.current;
    }
    return () => {
      if (window.sun3DRef === groupRef.current) {
        delete window.sun3DRef;
      }
    };
  }, []);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={clonedScene} rotation={[0, 0, 0]} />
    </group>
  );
}

// Preload the model for better performance
useGLTF.preload(MODEL_PATH);
