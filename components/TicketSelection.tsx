import React from 'react'

export function TicketSelection({ onSelectTicket }: { onSelectTicket: (ticket: any) => void }) {
  const demoTickets = [
    { id: 't1', name: 'Standard Adult', description: 'Standard pass for one adult.', price: 50, currency: 'EUR', available: true, deadline: '2026-09-30' },
    { id: 't2', name: 'University Student', description: 'Discounted pass for university students.', price: 25, currency: 'EUR', available: true, deadline: '2026-09-30' },
    { id: 't3', name: 'VIP', description: 'Includes access to the VIP lounge and special events.', price: 100, currency: 'EUR', available: true, deadline: '2026-09-30' },
    { id: 't4', name: 'Early Bird', description: 'Discounted pass for early registration.', price: 40, currency: 'EUR', available: true, deadline: '2026-08-31' },
    { id: 't5', name: 'Group (5 people)', description: 'A discounted rate for a group of 5 people.', price: 150, currency: 'EUR', available: true, deadline: '2026-09-30' },
    { id: 't6', name: 'Under 18', description: 'A discounted pass for attendees under 18 years old.', price: 15, currency: 'EUR', available: true, deadline: '2026-09-30' },
    { id: 't7', name: 'Senior (65+)', description: 'A discounted pass for senior attendees.', price: 20, currency: 'EUR', available: true, deadline: '2026-09-30' },
    { id: 't8', name: 'Job Seeker', description: 'A discounted pass for job seekers.', price: 10, currency: 'EUR', available: true, deadline: '2026-09-30' },
    { id: 't9', name: 'Remote', description: 'Access to the event remotely.', price: 30, currency: 'EUR', available: true, deadline: '2026-09-30' },
  ]

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {demoTickets.map((t) => (
        <div key={t.id} className="p-6 border rounded">
          <h4 className="font-bold">{t.name} — €{t.price}</h4>
          <p className="text-sm">{t.description}</p>
          <button className="mt-4 bg-[#0D1858] text-white py-2 px-4 rounded" onClick={() => onSelectTicket(t)}>
            Buy
          </button>
        </div>
      ))}
    </div>
  )
}

export default TicketSelection;
