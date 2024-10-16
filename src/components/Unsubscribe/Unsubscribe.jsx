import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Box, Button, Typography, Alert, Snackbar } from "@mui/material"
import { doc, getDoc, deleteDoc } from 'firebase/firestore'
import firebaseDB from '../../firebaseConfig'

export default function Unsubscribe() {
    const { id } = useParams()
    const [successEmail, setSuccessEmail] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function handleUnsubscribe() {
        try {
            const userDocRef = doc(firebaseDB, 'users', id)
            const userDoc = await getDoc(userDocRef)

            if (!userDoc.exists()) {
                setError('User not found')
                return
            }

            const { email } = userDoc.data()

            await deleteDoc(userDocRef);

            setSuccessEmail(email)
            setError('')
        } catch (error) {
            console.error('Error unsubscribing:', error)
            setSuccessEmail('')
            setError('Error unsubscribing. Please try again.')
        }
    }

    function handleSnackbarClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setError('')
    }

    function handleNavigateHome() {
        navigate('/')
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" textAlign="center">
            <Typography variant="h4" gutterBottom>
                Unsubscribe
            </Typography>
            <Typography variant="body1" gutterBottom>
                Are you sure you want to unsubscribe? This action cannot be undone.
            </Typography>
            <Button variant="contained" color="primary" onClick={successEmail ? handleNavigateHome : handleUnsubscribe}>
                {successEmail ? 'Return to Home' : 'Confirm Unsubscribe'}
            </Button>
            {successEmail && 
                <Snackbar open={!!successEmail} autoHideDuration={5000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center'}}>
                    <Alert severity='success' onClose={handleSnackbarClose}>Successfully unsubscribed for {successEmail}</Alert>
                </Snackbar>
            }
            {error &&
                <Snackbar open={!!error} autoHideDuration={5000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center'}}>
                    <Alert severity='error' onClose={handleSnackbarClose}>{error}</Alert>
                </Snackbar>
            }
        </Box>
    );
}