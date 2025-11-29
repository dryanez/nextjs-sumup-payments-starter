import React, { useEffect, useRef, useState } from 'react'
import usePaymentWidget from '../hooks/use-payment-widget'

export const CheckoutForm = ({ selectedTicket, onBack, onSuccess, checkoutData }: any) => {
  const [SumUpCard, isLoading] = usePaymentWidget() as unknown as [any, boolean]
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [widgetMounted, setWidgetMounted] = useState(false)
  const [widgetError, setWidgetError] = useState<string | null>(null)

  useEffect(() => {
    if (!SumUpCard || !checkoutData?.id || !containerRef.current) return
    
    console.log('Mounting SumUp widget with checkoutId:', checkoutData.id)
    
    try {
      const widget = SumUpCard.mount({
        checkoutId: checkoutData.id,
        onResponse: (type: string, body: any) => {
          console.log('SumUp widget response:', type, body)
          if (type === 'success' && body?.status === 'PAID') {
            onSuccess(checkoutData.id)
          } else if (type === 'error' || body?.status === 'FAILED') {
            setWidgetError('Payment failed. Please try again.')
          }
        },
        onLoad: () => {
          console.log('SumUp widget loaded')
          setWidgetMounted(true)
        },
      })
      
      // Mount to the container
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
        containerRef.current.appendChild(widget)
      }
      
      return () => {
        try {
          widget?.unmount?.()
        } catch (e) {
          // ignore unmount errors
        }
      }
    } catch (e: any) {
      console.error('Failed to mount SumUp widget', e)
      setWidgetError(e?.message || 'Failed to load payment widget')
    }
  }, [SumUpCard, checkoutData?.id])

  return (
    <div className="max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white">
      <h3 className="text-xl font-bold text-[#0D1858] mb-4">Complete Your Payment</h3>
      <div className="mb-4 p-4 bg-gray-50 rounded">
        <p className="font-semibold">{selectedTicket?.name}</p>
        <p className="text-2xl font-bold text-[#FE6448]">€{selectedTicket?.price?.toFixed(2)}</p>
      </div>
      
      {/* SumUp widget container */}
      <div ref={containerRef} id="sumup-card" className="min-h-[200px] mb-4">
        {isLoading && (
          <div className="flex items-center justify-center h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0D1858]"></div>
            <span className="ml-2">Loading payment form...</span>
          </div>
        )}
        {!isLoading && !checkoutData?.id && (
          <div className="text-center text-gray-500 py-8">
            <p>No checkout created. Please go back and select a ticket.</p>
          </div>
        )}
      </div>
      
      {widgetError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {widgetError}
        </div>
      )}
      
      <div className="flex gap-2">
        <button 
          className="flex-1 bg-gray-200 hover:bg-gray-300 py-3 px-4 rounded font-medium transition-colors" 
          onClick={onBack}
        >
          ← Back
        </button>
      </div>
      
      {checkoutData?.id && (
        <p className="mt-4 text-xs text-gray-400 text-center">
          Checkout ID: {checkoutData.id}
        </p>
      )}
    </div>
  )
}

export default CheckoutForm
