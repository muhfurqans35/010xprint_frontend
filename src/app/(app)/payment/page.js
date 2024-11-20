import { useState } from 'react'
import useEwalletPayment from '../hooks/useEwalletPayment'

const PaymentPage = ({ orderId }) => {
    const [ewalletType, setEwalletType] = useState('OVO')
    const [phone, setPhone] = useState('')
    const {
        createEwalletPayment,
        loading,
        error,
        paymentData,
    } = useEwalletPayment()

    const handleSubmit = async e => {
        e.preventDefault()
        await createEwalletPayment(orderId, ewalletType, phone)
    }

    return (
        <div>
            <h1>Make a Payment</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>E-Wallet Type</label>
                    <select
                        value={ewalletType}
                        onChange={e => setEwalletType(e.target.value)}>
                        <option value="OVO">OVO</option>
                        <option value="DANA">DANA</option>
                        <option value="LINKAJA">LinkAja</option>
                    </select>
                </div>
                <div>
                    <label>Phone Number</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Pay'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {paymentData && (
                <div>
                    <h2>Payment Created</h2>
                    <p>Redirect to: {paymentData.actions.mobile_deeplink}</p>
                </div>
            )}
        </div>
    )
}

export default PaymentPage
