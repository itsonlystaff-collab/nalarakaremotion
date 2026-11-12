import React from 'react';
import {interpolate, spring} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {useCurrentFrame} from 'remotion';

const Metal: React.FC<{position: [number, number, number]; scale: [number, number, number]}> = ({position, scale}) => (
  <mesh position={position} scale={scale} castShadow receiveShadow>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial color="#64748b" metalness={0.82} roughness={0.28}/>
  </mesh>
);

export const AirbagScene: React.FC<{frame: number}> = ({frame}) => {
  const f = frame;
  const deploy = spring({frame: f - 170, fps: 60, config: {damping: 18, stiffness: 90, mass: 0.8}});
  const inflate = interpolate(f, [245, 315, 380], [0.05, 1, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const deflate = interpolate(f, [520, 610, 690], [1, 0.82, 0.05], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const bagScale = Math.max(0.05, inflate * deflate);
  const rotate = interpolate(f, [0, 170, 360, 719], [-0.18, 0, 0.06, 0.12]);
  const exploded = interpolate(f, [140, 220, 430, 520], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <>
      <ambientLight intensity={0.65}/>
      <directionalLight position={[5, 7, 8]} intensity={2.2} castShadow/>
      <pointLight position={[-4, 1, 4]} intensity={1.3} color="#38bdf8"/>
      <group rotation={[0, rotate, 0]}>
        {/* Steering wheel and hub */}
        <mesh position={[0, 0.1, 0]} rotation={[0, 0, 0.1]} castShadow>
          <torusGeometry args={[1.18, 0.13, 20, 80]}/>
          <meshStandardMaterial color="#111827" metalness={0.25} roughness={0.42}/>
        </mesh>
        <mesh position={[0, 0.1, 0.08]} castShadow>
          <cylinderGeometry args={[0.43, 0.43, 0.24, 48]}/>
          <meshStandardMaterial color="#334155" metalness={0.55} roughness={0.3}/>
        </mesh>
        <Metal position={[0, -0.75, -0.03]} scale={[0.2, 1.0, 0.22]}/>
        {/* Inflator canister, shifting out during exploded view */}
        <group position={[0, -0.05 - exploded * 1.2, -1.05]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.28, 0.28, 1.1, 32]}/>
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.22}/>
          </mesh>
          <mesh position={[0, -0.58, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.12, 24]}/>
            <meshStandardMaterial color="#38bdf8" metalness={0.6}/>
          </mesh>
        </group>
        {/* Airbag fabric */}
        <mesh position={[0, 0.1 + bagScale * 0.2, 0.85 + deploy * 0.5]} scale={[0.12 + bagScale * 1.05, 0.12 + bagScale * 1.2, 0.12 + bagScale * 0.75]} castShadow>
          <sphereGeometry args={[1, 48, 36]}/>
          <meshStandardMaterial color="#e2e8f0" roughness={0.92} metalness={0.02}/>
        </mesh>
        {/* Gas particles */}
        {Array.from({length: 18}).map((_, i) => {
          const a = (i / 18) * Math.PI * 2;
          const r = 1.3 + (i % 3) * 0.22;
          const visible = interpolate(f, [250, 290, 365, 410], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <mesh key={i} position={[Math.cos(a) * r * visible, Math.sin(a) * r * visible, 0.9]}>
              <sphereGeometry args={[0.035 + (i % 4) * 0.012, 10, 10]}/>
              <meshBasicMaterial color="#7dd3fc" transparent opacity={visible * 0.8}/>
            </mesh>
          );
        })}
      </group>
      {/* Floor grid */}
      <gridHelper args={[18, 28, '#29435e', '#17283b']} position={[0, -2.1, 0]}/>
    </>
  );
};
