import React from 'react'

export default function ResponsiveNavigation({ links = [], logoSrc, logoAlt }: any) {
  return (
    <nav className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img src={logoSrc} alt={logoAlt} className="h-10" />
        <div className="hidden md:flex gap-4">
          {links.map((l: any) => (
            <a key={l.href} href={l.href} className={l.isActive ? 'text-[#FE6448]' : ''}>{l.label}</a>
          ))}
        </div>
      </div>
    </nav>
  )
}
