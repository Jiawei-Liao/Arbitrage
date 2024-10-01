import { useState } from 'react'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, DialogContentText, Alert, Snackbar, CircularProgress } from '@mui/material'
import { addDoc, collection } from 'firebase/firestore'

import firebaseDB from '../../firebaseConfig'

export default function SubscribeDialog({ closeDialog, onSuccess }) {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubscribe() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address.')
            return
        }

        setLoading(true)

        try {
            await addDoc(collection(firebaseDB, 'users'), { email });
            setEmail('')
            setError('')
            onSuccess(email)
        } catch (error) {
            console.error('Error subscribing:', error)
            setError('Error subscribing. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    function handleSnackbarClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setError('')
    }

    return (
        <>
            <Dialog open={true} onClose={closeDialog}>
                <DialogTitle>Subscribe for Arbitrage Opportunities</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Subscribe to receive notifications when arbitrage opportunities are found.
                    </DialogContentText>
                    <TextField autoFocus margin="dense" label="Email Address" type="email" fullWidth variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} color='primary'>Cancel</Button>
                    <Button onClick={handleSubscribe} color='secondary' disabled={loading} style={{ minWidth: 100 }}>
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Subscribe'}
                    </Button>
                </DialogActions>
            </Dialog>
            {error && 
                <Snackbar open={!!error} autoHideDuration={5000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center'}}>
                    <Alert severity='error' onClose={handleSnackbarClose}>{error}</Alert>
                </Snackbar>
            }
        </>
    )
}