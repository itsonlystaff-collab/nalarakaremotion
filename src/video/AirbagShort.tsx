import React from 'react';
import {AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {AirbagScene} from './AirbagScene';

const Caption: React.FC<{title: string; sub: string}> = ({title, sub}) => {
  const f = useCurrentFrame();
  const opacity = interpolate(f, [-8, 8, 105, 125], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const y = interpolate(f, [-8, 12], [35, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', left: 72, right: 72, bottom: 250, opacity, transform: `translateY(${y}px)`, color: 'white', fontFamily: 'Arial, sans-serif'}}>
      <div style={{fontSize: 64, fontWeight: 900, lineHeight: 1.03, letterSpacing: -2, textShadow: '0 5px 22px #000'}}>{title}</div>
      <div style={{marginTop: 22, fontSize: 31, lineHeight: 1.25, color: '#cbd5e1', textShadow: '0 3px 12px #000'}}>{sub}</div>
    </div>
  );
};

export const AirbagShort: React.FC = () => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const pulse = 0.5 + Math.sin(frame / 16) * 0.08;
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #07111f 0%, #101d31 55%, #050914 100%)'}}>
      <ThreeCanvas width={width} height={height} camera={{position: [0, 0.3, 9.5], fov: 38}} style={{width: '100%', height: '100%'}}>
        <AirbagScene frame={frame} />
      </ThreeCanvas>
      <div style={{position: 'absolute', top: 90, left: 72, right: 72, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#93c5fd', fontFamily: 'Arial, sans-serif', fontSize: 23, fontWeight: 800, letterSpacing: 5}}>
        <span>NALARKA LAB</span><span>HOW IT WORKS</span>
      </div>
      <div style={{position: 'absolute', top: 190, left: 72, right: 72, opacity: interpolate(frame, [0, 25, 110, 145], [0, 1, 1, 0], {extrapolateRight: 'clamp'}), color: 'white', fontFamily: 'Arial, sans-serif', fontSize: 78, fontWeight: 900, lineHeight: 0.98, letterSpacing: -3}}>
        DALAM 0,03<br/>DETIK.
      </div>
      <Sequence from={0} durationInFrames={140}><Caption title="Benturan terdeteksi." sub="Sensor membaca perlambatan ekstrem kendaraan." /></Sequence>
      <Sequence from={140} durationInFrames={145}><Caption title="Gas dilepaskan." sub="Inflator menghasilkan gas untuk mengembangkan kantong udara." /></Sequence>
      <Sequence from={285} durationInFrames={150}><Caption title="Kantong mengembang." sub="Airbag mengembang sangat cepat di depan penumpang." /></Sequence>
      <Sequence from={435} durationInFrames={145}><Caption title="Lalu langsung kempis." sub="Lubang kecil membuang gas agar tubuh tidak terpental." /></Sequence>
      <Sequence from={580} durationInFrames={140}><Caption title="Bukan bantal biasa." sub="Airbag adalah sistem keselamatan yang bekerja dalam sekejap." /></Sequence>
      <div style={{position: 'absolute', bottom: 95, left: 72, right: 72, height: 5, background: 'rgba(148,163,184,.25)', borderRadius: 9}}>
        <div style={{height: '100%', width: `${(frame / 719) * 100}%`, background: `rgba(96,165,250,${pulse})`, borderRadius: 9}}/>
      </div>
    </AbsoluteFill>
  );
};
