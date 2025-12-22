import { useEffect, useState } from 'react';

export function SystemStatus() {
  const [status, setStatus] = useState<'LOADING' | 'ONLINE' | 'OFFLINE'>('LOADING');
  const [lastCheck, setLastCheck] = useState('');

  useEffect(() => {
    fetch('/api/pulse')
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => {
        setStatus(data.status === 'ONLINE' ? 'ONLINE' : 'OFFLINE');
        setLastCheck(new Date(data.checked_at).toLocaleTimeString());
      })
      .catch(() => setStatus('OFFLINE'));
  }, []);

  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
      <div className="relative flex h-3 w-3">
        {status === 'ONLINE' && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        )}
        <span className={`relative inline-flex rounded-full h-3 w-3 ${
          status === 'ONLINE' ? 'bg-emerald-500' : 
          status === 'LOADING' ? 'bg-yellow-500' : 'bg-red-500'
        }`}></span>
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-white tracking-wider">
          XRPL NETWORK
        </span>
        <span className="text-[10px] text-gray-400 uppercase">
          {status} {lastCheck && `• ${lastCheck}`}
        </span>
      </div>
    </div>
  );
}