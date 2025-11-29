import { NextPage } from 'next';
import { useState } from 'react';
import Link from 'next/link';

import { Meta } from '../components/Meta';
import { Logo } from '../components/Logo';
import { Main } from '../components/Main';
import { TicketSelection } from '../components/TicketSelection';

interface TicketType {
  id: string
  name: string
  description: string
  price: number
  currency: string
  available: boolean
  deadline: string
}

const title = 'Select your ticket';

const Page: NextPage = () => {
  const [currentStep, setCurrentStep] = useState("selection");

  const handleTicketSelection = (ticket: TicketType) => {
    (async () => {
      try {
        const amount = ticket.price.toFixed(2)
        const res = await fetch('/api/create-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount, currency: ticket.currency, ticketId: ticket.id }),
        })

        if (!res.ok) {
          const alt = await fetch('/api/payments/create-test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount, currency: ticket.currency, ticketId: ticket.id }),
          })
          if (alt.ok) {
            const data = await alt.json()
            const redirect = data.checkoutUrl || data.checkout_url || data.redirect_url || data.url
            if (redirect) window.location.href = redirect
            else {
              alert('Could not get checkout URL')
            }
            return
          }
          alert('Could not create checkout')
          return
        }

        const data = await res.json()
        const redirect = data.checkoutUrl || data.checkout_url || data.redirect_url || data.url
        if (redirect) {
          window.location.href = redirect
        } else {
          alert('Could not get checkout URL')
        }
      } catch (err) {
        alert(`An error occurred: ${err.message}`)
      }
    })()
  }


  return (
    <>
      <Meta title={title} path="/tickets" />
      <Main>
        <Logo />
        <h1 style={{'textAlign': 'center'}}>{title}</h1>
        <TicketSelection onSelectTicket={handleTicketSelection} />
        <Link href="/">
          Back to home
        </Link>
      </Main>
    </>
  )
};

export default Page;
