'use client';

import React, { useState, useEffect, useRef } from 'react';

interface AudioToggleProps {
  className?: string;
}

export const AudioToggle: React.FC<AudioToggleProps> = ({ className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  // Initialize Web Audio Synth Soundscape
  const startSynth = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Master Gain Node for volume control and smooth fade in/out
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.5);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Low Pass Filter for ambient warmth
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      // Low-frequency LFO to modulate filter cutoff for a breathing texture
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.2, ctx.currentTime); // 0.2 Hz slow pulse
      lfoGain.gain.setValueAtTime(120, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
      lfoRef.current = lfo;

      filter.connect(masterGain);

      // Oscillator 1: Root note 55 Hz (A1) sine
      const osc1 = ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, ctx.currentTime);
      osc1.connect(filter);
      osc1.start();
      osc1Ref.current = osc1;

      // Oscillator 2: Fifth interval 82.41 Hz (E2) triangle with subtle detune
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(82.41, ctx.currentTime);
      osc2.detune.setValueAtTime(4, ctx.currentTime);
      
      const osc2Gain = ctx.createGain();
      osc2Gain.gain.setValueAtTime(0.4, ctx.currentTime);
      osc2.connect(osc2Gain);
      osc2Gain.connect(filter);
      osc2.start();
      osc2Ref.current = osc2;
    } catch (err) {
      console.warn('Web Audio Context initialization error:', err);
    }
  };

  const stopSynth = () => {
    if (audioCtxRef.current && gainNodeRef.current) {
      const ctx = audioCtxRef.current;
      const gain = gainNodeRef.current;

      // Smooth fade out over 0.5s before closing context
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5);

      setTimeout(() => {
        try {
          osc1Ref.current?.stop();
          osc2Ref.current?.stop();
          lfoRef.current?.stop();
          ctx.close();
        } catch {
          // ignore cleanup error
        }
        audioCtxRef.current = null;
        gainNodeRef.current = null;
      }, 500);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopSynth();
      setIsPlaying(false);
    } else {
      startSynth();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup synth context on component unmount
      if (audioCtxRef.current) {
        stopSynth();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      data-cursor="hover"
      aria-label={isPlaying ? 'Mute ambient soundscape' : 'Unmute ambient soundscape'}
      className={`relative group flex items-center gap-3 px-4 py-2 rounded-full border border-zinc-800 bg-zinc-950/80 backdrop-blur-md text-xs font-mono tracking-wider transition-all duration-300 hover:border-[#00f3ff]/50 hover:shadow-[0_0_15px_rgba(0,243,255,0.25)] ${className}`}
    >
      {/* Sound indicator label */}
      <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors">
        {isPlaying ? 'SOUND ON' : 'SOUND OFF'}
      </span>

      {/* Animated Equalizer Bars SVG */}
      <div className="flex items-end gap-[3px] h-4 w-4 justify-center">
        {/* Bar 1 */}
        <span
          className={`w-[2.5px] rounded-full bg-[#00f3ff] transition-all duration-300 ${
            isPlaying
              ? 'h-4 animate-[bounce_1s_infinite_100ms]'
              : 'h-1.5 opacity-40 bg-zinc-600'
          }`}
        />
        {/* Bar 2 */}
        <span
          className={`w-[2.5px] rounded-full bg-[#9d00ff] transition-all duration-300 ${
            isPlaying
              ? 'h-4 animate-[bounce_1s_infinite_300ms]'
              : 'h-3 opacity-40 bg-zinc-600'
          }`}
        />
        {/* Bar 3 */}
        <span
          className={`w-[2.5px] rounded-full bg-[#00f3ff] transition-all duration-300 ${
            isPlaying
              ? 'h-4 animate-[bounce_1s_infinite_200ms]'
              : 'h-2 opacity-40 bg-zinc-600'
          }`}
        />
        {/* Bar 4 */}
        <span
          className={`w-[2.5px] rounded-full bg-[#9d00ff] transition-all duration-300 ${
            isPlaying
              ? 'h-4 animate-[bounce_1s_infinite_400ms]'
              : 'h-1.5 opacity-40 bg-zinc-600'
          }`}
        />
      </div>
    </button>
  );
};

export default AudioToggle;
