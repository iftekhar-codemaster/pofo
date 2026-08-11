'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  colorCyan?: string;
  colorPurple?: string;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 1800,
  colorCyan = '#00f3ff',
  colorPurple = '#9d00ff',
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  // Dummy object for calculating transform matrix for each instance
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-generate initial particle positions, velocities, scales, and colors
  const { particles, colors } = useMemo(() => {
    const pData = [];
    const colorArray = new Float32Array(count * 3);
    const cyan = new THREE.Color(colorCyan);
    const purple = new THREE.Color(colorPurple);

    for (let i = 0; i < count; i++) {
      // Radius distribution inside a sphere/ellipsoid field
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 14.0; // Radial spread up to 14 units

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = (r * Math.cos(phi)) * 0.6; // Slightly flattened along Z axis

      const scale = Math.random() * 0.6 + 0.3;
      const speed = Math.random() * 0.5 + 0.2;
      const phase = Math.random() * Math.PI * 2;

      pData.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        currentX: x,
        currentY: y,
        currentZ: z,
        scale,
        speed,
        phase,
      });

      // Gradient color interpolation between cyan and purple
      const mixRatio = Math.random();
      const pColor = cyan.clone().lerp(purple, mixRatio);
      colorArray[i * 3] = pColor.r;
      colorArray[i * 3 + 1] = pColor.g;
      colorArray[i * 3 + 2] = pColor.b;
    }

    return { particles: pData, colors: colorArray };
  }, [count, colorCyan, colorPurple]);

  // Set initial instance colors
  React.useEffect(() => {
    if (!meshRef.current) return;
    const instancedMesh = meshRef.current;
    
    for (let i = 0; i < count; i++) {
      const color = new THREE.Color(
        colors[i * 3],
        colors[i * 3 + 1],
        colors[i * 3 + 2]
      );
      instancedMesh.setColorAt(i, color);
    }
    if (instancedMesh.instanceColor) {
      instancedMesh.instanceColor.needsUpdate = true;
    }
  }, [count, colors]);

  const { viewport } = useThree();

  useFrame((state, delta) => {
    if (!meshRef.current || !groupRef.current) return;

    const time = state.clock.getElapsedTime();
    // Normalized pointer coordinates (-1 to 1) converted to viewport dimensions
    const mouseX = (state.pointer.x * viewport.width) / 2;
    const mouseY = (state.pointer.y * viewport.height) / 2;

    // Smooth continuous rotation of the particle universe
    groupRef.current.rotation.y += delta * 0.05;
    groupRef.current.rotation.x = Math.sin(time * 0.15) * 0.08;

    for (let i = 0; i < count; i++) {
      const p = particles[i];

      // Organic floating wave animation
      const floatX = Math.sin(time * p.speed + p.phase) * 0.25;
      const floatY = Math.cos(time * p.speed * 0.8 + p.phase) * 0.25;
      const floatZ = Math.sin(time * p.speed * 1.2 + p.phase) * 0.2;

      let targetX = p.baseX + floatX;
      let targetY = p.baseY + floatY;
      let targetZ = p.baseZ + floatZ;

      // Mouse distortion calculation
      const dx = targetX - mouseX;
      const dy = targetY - mouseY;
      const distSq = dx * dx + dy * dy;
      const maxRadius = 4.0;
      const maxRadiusSq = maxRadius * maxRadius;

      if (distSq < maxRadiusSq && distSq > 0.0001) {
        const dist = Math.sqrt(distSq);
        const force = (1.0 - dist / maxRadius) * 1.8;
        targetX += (dx / dist) * force;
        targetY += (dy / dist) * force;
        targetZ += force * 0.8;
      }

      // Smooth interpolation (lerp) toward target position
      p.currentX += (targetX - p.currentX) * 0.1;
      p.currentY += (targetY - p.currentY) * 0.1;
      p.currentZ += (targetZ - p.currentZ) * 0.1;

      dummy.position.set(p.currentX, p.currentY, p.currentZ);
      
      // Pulse particle scale slightly over time
      const pulseScale = p.scale * (1.0 + Math.sin(time * 2.0 + p.phase) * 0.15);
      dummy.scale.set(pulseScale, pulseScale, pulseScale);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, count]}
        castShadow={false}
        receiveShadow={false}
      >
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshStandardMaterial
          roughness={0.2}
          metalness={0.8}
          emissive="#00f3ff"
          emissiveIntensity={0.6}
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
    </group>
  );
};

export default ParticleField;
