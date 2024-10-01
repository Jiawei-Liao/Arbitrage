import { useState } from 'react'
import { AppBar, Box, IconButton, Toolbar, Typography, Alert, Snackbar } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'

import SubscribeDialog from './SubscribeDialog'

export default function Header() {
    const [isSubscribeDialogOpen, setIsSubscribeDialogOpen] = useState(false)
    const [successEmail, setSuccessEmail] = useState('')

    function openSubscribeDialog() {
        setIsSubscribeDialogOpen(true)
    }

    function closeSubscribeDialog() {
        setIsSubscribeDialogOpen(false)
    }

    function onSuccess(email) {
        setSuccessEmail(email)
        closeSubscribeDialog()
    }

    function handleSnackbarClose(event, reason) {
        if (reason === 'clickaway') {
            return
        }
        setSuccessEmail('')
    }

    return (
        <Box sx={{ zIndex: 3, width: '100%' }}>
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6" sx={{ pl: 2 }}>
                        Arbitrage Finder
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, pr: 2 }}>
                        <IconButton sx={{ borderRadius: 0 }} color='inherit' onClick={() => window.open('https://github.com/Jiawei-Liao/Arbitrage', '_blank') }>
                            <GitHubIcon />
                        </IconButton>
                        <IconButton sx={{ borderRadius: 0 }} color='inherit' onClick={openSubscribeDialog}>
                            <NotificationsActiveIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {isSubscribeDialogOpen && <SubscribeDialog closeDialog={closeSubscribeDialog} onSuccess={onSuccess} />}
            {successEmail && 
                <Snackbar open={!!successEmail} autoHideDuration={5000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center'}}>
                    <Alert severity='success' onClose={handleSnackbarClose}>Successfully subscribed to {successEmail}</Alert>
                </Snackbar>
            }
        </Box>
    )
}