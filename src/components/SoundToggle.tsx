import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../utils/sound';

export const SoundToggle: React.FC = () => {
  const [enabled, setEnabled] = useState(true);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    sounds.enabled = next;
    if (next) {
      sounds.playPop();
    }
  };

  return (
    <button
      onClick={toggle}
      title={enabled ? 'Mute sound effects' : 'Unmute sound effects'}
      aria-label={enabled ? 'Mute sound effects' : 'Unmute sound effects'}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
    >
      {enabled ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-pink-400" />
          <span>Sound ON</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-slate-400">Sound OFF</span>
        </>
      )}
    </button>
  );
};
