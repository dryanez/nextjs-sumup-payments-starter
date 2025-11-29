import React from 'react'

export const PaymentSuccess = ({ orderId }: { orderId: string }) => (
  <div className="p-6 border rounded bg-green-50">
    <h3 className="font-bold">Payment successful</h3>
    <p>Order ID: {orderId}</p>
  </div>
)

export default PaymentSuccess
