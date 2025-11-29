import React, { useEffect, useRef } from 'react'
import usePaymentWidget from '../hooks/use-payment-widget'

export const CheckoutForm = ({ selectedTicket, onBack, onSuccess, checkoutData }: any) => {
  const [SumUpCard] = usePaymentWidget() as unknown as [any]
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!SumUpCard || !checkoutData) return
    try {
      const WidgetClass: any = SumUpCard
      const widget = new WidgetClass({
        checkoutId: checkoutData.id,
        target: containerRef.current,
        onSuccess: () => onSuccess(checkoutData.id),
        onError: (err: any) => console.error('Widget error', err),
      })
      widget.mount()
      return () => widget.unmount()
    } catch (e) {
      console.error('Failed to mount SumUp widget', e)
    }
  }, [SumUpCard, checkoutData])

  return (
    <div className="p-6 border rounded">
      <h3 className="font-bold">Checkout — {selectedTicket?.name}</h3>
      <p>Amount: €{selectedTicket?.price}</p>
      <div ref={containerRef} className="mt-4" />
      <div className="mt-4">
        <button className="mr-2 bg-gray-200 py-2 px-4 rounded" onClick={onBack}>Back</button>
        {!checkoutData && (
          <button className="bg-green-600 text-white py-2 px-4 rounded" onClick={() => onSuccess('ORDER123')}>Simulate success</button>
        )}
      </div>
    </div>
  )
}

export default CheckoutForm
