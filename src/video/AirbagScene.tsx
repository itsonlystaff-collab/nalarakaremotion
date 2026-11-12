import React from 'react';
import {interpolate, spring} from 'remotion';

const Metal: React.FC<{
  position: [number, number, number];
  scale: [number, number, number];
}> = ({position, scale}) => (
  <mesh position={position} scale={scale} castShadow receiveShadow>
    <boxGeometry args={[1, 1, 1]} />
    <meshStandardMaterial
      color="#64748b"
      metalness={0.85}
      roughness={0.25}
    />
  </mesh>
);

export const AirbagScene: React.FC<{frame: number}> = ({frame}) => {
  const f = frame;

  // Timeline video: 30 detik pada 60 FPS
  const intro = interpolate(f, [0, 300], [0.88, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Komponen terurai, lalu kembali ke posisi semula
  const exploded = interpolate(
    f,
    [300, 480, 570, 720],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );

  // Airbag mulai keluar dari setir
  const deploy = spring({
    frame: f - 700,
    fps: 60,
    config: {damping: 16, stiffness: 75, mass: 0.9},
  });

  const inflate = interpolate(f, [700, 900, 1050], [0.05, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Airbag perlahan mengempis setelah mengembang
  const deflate = interpolate(f, [1400, 1650, 1800], [1, 0.92, 0.82], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const bagScale = Math.max(0.05, inflate * deflate);

  // Gerakan sinematik objek sepanjang video
  const orbit = interpolate(f, [0, 600, 1200, 1800], [-0.2, 0.08, 0.32, 0.55], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const tilt = interpolate(f, [0, 450, 900, 1350, 1800], [0.04, -0.08, 0.02, 0.08, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const explodedOffset = exploded * 1.15;
  const bagVisible = interpolate(f, [650, 760], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const particlesVisible = interpolate(f, [760, 850, 1150, 1300], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[5, 8, 7]}
        intensity={2.4}
        castShadow
      />
      <pointLight position={[-4, 2, 4]} intensity={1.5} color="#38bdf8" />
      <pointLight position={[4, -1, -3]} intensity={1.2} color="#f97316" />

      <group
        position={[0, 0, 0]}
        rotation={[tilt, orbit, 0]}
        scale={intro}
      >
        {/* Rangka utama setir */}
        <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
          <torusGeometry args={[1.18, 0.13, 24, 96]} />
          <meshStandardMaterial
            color="#111827"
            metalness={0.3}
            roughness={0.38}
          />
        </mesh>

        {/* Detail bagian dalam setir */}
        <mesh position={[0, 0.1, 0.06]} castShadow>
          <cylinderGeometry args={[0.43, 0.43, 0.24, 48]} />
          <meshStandardMaterial
            color="#334155"
            metalness={0.65}
            roughness={0.28}
          />
        </mesh>

        {/* Batang setir */}
        <Metal
          position={[0, -0.75, -0.03]}
          scale={[0.2, 1, 0.22]}
        />

        {/* Lengan kiri dan kanan setir */}
        <Metal
          position={[-0.55, -0.28, 0]}
          scale={[0.72, 0.13, 0.18]}
        />
        <Metal
          position={[0.55, -0.28, 0]}
          scale={[0.72, 0.13, 0.18]}
        />

        {/* Modul inflator */}
        <group position={[0, -0.05 - explodedOffset, -1.05]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.28, 0.28, 1.1, 40]} />
            <meshStandardMaterial
              color="#94a3b8"
              metalness={0.92}
              roughness={0.2}
            />
          </mesh>

          <mesh position={[0, -0.58, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.12, 32]} />
            <meshStandardMaterial
              color="#38bdf8"
              metalness={0.7}
              roughness={0.22}
            />
          </mesh>

          {/* Ujung inflator */}
          <mesh position={[0, 0.58, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.12, 32]} />
            <meshStandardMaterial
              color="#cbd5e1"
              metalness={0.85}
              roughness={0.25}
            />
          </mesh>
        </group>

        {/* Rumah modul airbag */}
        <mesh position={[0, 0.1 - explodedOffset * 0.25, 0.35]}>
          <boxGeometry args={[0.8, 0.55, 0.35]} />
          <meshStandardMaterial
            color="#475569"
            metalness={0.55}
            roughness={0.4}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Airbag mengembang */}
        <group
          position={[0, 0.1 + bagScale * 0.18, 0.85 + deploy * 0.55]}
          scale={[
            (0.12 + bagScale * 1.05) * bagVisible,
            (0.12 + bagScale * 1.2) * bagVisible,
            (0.12 + bagScale * 0.75) * bagVisible,
          ]}
        >
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[1, 64, 48]} />
            <meshStandardMaterial
              color="#e2e8f0"
              roughness={0.95}
              metalness={0.01}
            />
          </mesh>

          {/* Jahitan tengah pada kain airbag */}
          <mesh position={[0, 0, 0.88]} scale={[0.35, 0.35, 0.025]}>
            <sphereGeometry args={[1, 24, 16]} />
            <meshStandardMaterial color="#94a3b8" roughness={1} />
          </mesh>
        </group>

        {/* Partikel gas saat airbag mengembang */}
        {Array.from({length: 24}).map((_, i) => {
          const angle = (i / 24) * Math.PI * 2;
          const radius = 1.25 + (i % 4) * 0.2;
          const spread = particlesVisible;

          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius * spread,
                Math.sin(angle) * radius * spread,
                0.9 + (i % 3) * 0.12,
              ]}
            >
              <sphereGeometry args={[0.035 + (i % 4) * 0.012, 12, 12]} />
              <meshBasicMaterial
                color="#7dd3fc"
                transparent
                opacity={spread * 0.8}
              />
            </mesh>
          );
        })}
      </group>

      {/* Lantai studio */}
      <gridHelper
        args={[18, 32, '#29435e', '#17283b']}
        position={[0, -2.1, 0]}
      />

      {/* Cahaya dasar */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -2.12, 0]}
      >
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.85}
          metalness={0.15}
        />
      </mesh>
    </>
  );
};
