import React, { useState } from 'react'
import logoImage from 'figma:asset/6761fcdfd3fd44682c12fd25ffa6af6cef40dd6d.png'

interface LogoProps {
  className?: string
  size?: string
  alt?: string
}

export function Logo({ className = '', size = 'w-12 h-12', alt = 'PAYHUB Logo' }: LogoProps) {
  const [src, setSrc] = useState<string>(logoImage as unknown as string)
  const fallback =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><defs><radialGradient id="g" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="%232979FF"/><stop offset="100%" stop-color="%230F1218"/></radialGradient></defs><circle cx="64" cy="64" r="64" fill="url(%23g)"/><text x="64" y="70" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" text-anchor="middle" fill="white">PAYHUB</text></svg>'
  return (
    <img
      src={src}
      alt={alt}
      className={`${size} rounded-full ${className}`}
      onError={() => setSrc(fallback)}
    />
  )
}

