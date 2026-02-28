import { useRef, useEffect, useMemo } from 'react';
import { useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { TextureLoader } from 'three';
import * as THREE from 'three';

/**
 * Moon 3D Component
 * Loads moon.obj model with MTL materials and manually loads textures
 */

// Use Vite base path for model URLs
const OBJ_PATH = `${import.meta.env.BASE_URL}models/moon/Moon 2K.obj`;
const MTL_PATH = `${import.meta.env.BASE_URL}models/moon/Moon 2K.mtl`;
const DIFFUSE_TEXTURE = `${import.meta.env.BASE_URL}models/moon/Textures/Diffuse_2K.png`;
const BUMP_TEXTURE = `${import.meta.env.BASE_URL}models/moon/Textures/Bump_2K.png`;

export default function Moon3D({ position = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef();
  
  // Load textures manually
  const diffuseTexture = useLoader(TextureLoader, DIFFUSE_TEXTURE);
  const bumpTexture = useLoader(TextureLoader, BUMP_TEXTURE);
  
  // Load MTL materials first, then OBJ with materials
  const materials = useLoader(MTLLoader, MTL_PATH);
  const obj = useLoader(OBJLoader, OBJ_PATH, (loader) => {
    materials.preload();
    loader.setMaterials(materials);
  });

  // Process OBJ model and apply textures
  const processedModel = useMemo(() => {
    const model = obj.clone();

    // Configure textures
    diffuseTexture.colorSpace = THREE.SRGBColorSpace;
    diffuseTexture.flipY = false;
    bumpTexture.flipY = false;

    // Calculate bounding box and normalize
    const box = new THREE.Box3().setFromObject(model);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);

    if (maxDim > 0) {
      const normalizeScale = 1 / maxDim;
      model.scale.multiplyScalar(normalizeScale);
    }

    // Center the model
    const center = new THREE.Vector3();
    box.getCenter(center);
    model.position.sub(center.multiplyScalar(model.scale.x));

    // Apply textures to materials
    model.traverse((child) => {
      if (child.isMesh && child.material) {
        // Clone existing material
        const material = child.material.clone();
        
        // Handle both single materials and arrays
        const materials = Array.isArray(material) ? material : [material];
        
        materials.forEach((mat) => {
          // Apply textures
          mat.map = diffuseTexture.clone();
          mat.map.colorSpace = THREE.SRGBColorSpace;
          mat.map.flipY = false;
          mat.map.needsUpdate = true;
          
          // Apply bump/normal map
          mat.normalMap = bumpTexture.clone();
          mat.normalMap.flipY = false;
          mat.normalMap.needsUpdate = true;
          mat.normalScale = new THREE.Vector2(1, 1);
          
          // Enhance material properties
          mat.roughness = 0.8;
          mat.metalness = 0.1;
          
          // Add subtle emissive glow for visibility against dark background
          mat.emissive = new THREE.Color(0x101020);
          mat.emissiveIntensity = 0.15;
          
          // Ensure proper rendering
          mat.side = THREE.FrontSide;
          mat.needsUpdate = true;
        });
        
        child.material = Array.isArray(material) ? materials : materials[0];
      }
    });

    return model;
  }, [obj, diffuseTexture, bumpTexture]);

  // Expose ref to window for GSAP scroll animations
  useEffect(() => {
    if (groupRef.current) {
      window.moon3DRef = groupRef.current;
    }
    return () => {
      if (window.moon3DRef === groupRef.current) {
        delete window.moon3DRef;
      }
    };
  }, []);

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={processedModel} rotation={[0, 0, 0]} />
    </group>
  );
}
