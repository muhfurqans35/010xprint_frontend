import { useState } from 'react'
import axios from '@/lib/axios'

const useEwalletPayment = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [paymentData, setPaymentData] = useState(null)

    const createEwalletPayment = async (orderId, ewalletType, phone) => {
        setLoading(true)
        setError(null)

        try {
            const response = await axios.post(
                `/api/payment/ewallet/${orderId}`,
                {
                    ewallet_type: ewalletType,
                    phone,
                },
            )
            setPaymentData(response.data.data)
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to initiate payment')
        } finally {
            setLoading(false)
        }
    }

    return { createEwalletPayment, loading, error, paymentData }
}

export default useEwalletPayment
