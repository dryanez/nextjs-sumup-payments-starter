import React from 'react'

export const CheckoutForm = ({ selectedTicket, onBack, onSuccess }: any) => {
  return (
    <div className="p-6 border rounded">
      <h3 className="font-bold">Checkout — {selectedTicket?.name}</h3>
      <p>Amount: €{selectedTicket?.price}</p>
      <div className="mt-4">
        <button className="mr-2 bg-gray-200 py-2 px-4 rounded" onClick={onBack}>Back</button>
        <button className="bg-green-600 text-white py-2 px-4 rounded" onClick={() => onSuccess('ORDER123')}>Simulate success</button>
      </div>
    </div>
  )
}

export default CheckoutForm
