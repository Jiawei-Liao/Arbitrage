import { useEffect, useState, useCallback } from 'react';
import { Paper, Typography, Divider, TextField, Button, Alert } from '@mui/material';

export default function APICard({ APIKey, setAPIKey, setSports }) {
    const [tempAPIKey, setTempAPIKey] = useState(APIKey);
    const [quota, setQuota] = useState(null);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const validate = useCallback(async () => {
        const targetUrl = `https://api.the-odds-api.com/v4/sports/?apiKey=${tempAPIKey}`;
        try {
            const response = await fetch(targetUrl);
            if (!response.ok) {
                setError(true);
                setSuccess(false);
                setQuota(null);
            } else {
                const data = await response.json();
                setSports(data);
                setQuota(response.headers.get('x-requests-remaining'));
                setAPIKey(tempAPIKey);
                setError(false);
                setSuccess(true);
            }
        } catch (err) {
            setError(true);
            setSuccess(false);
            setQuota(null);
        }
    }, [tempAPIKey, setAPIKey, setSports]);

    useEffect(() => {
        validate();
    }, [validate]);

    return (
        <Paper sx={{ width: 500, p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">Step 1: Enter an API key</Typography>
            <Divider />
            <TextField
                label="API Key"
                value={tempAPIKey}
                onChange={(e) => setTempAPIKey(e.target.value)}
                fullWidth
                error={error}
                helperText={error ? "Invalid API key" : ""}
                sx={{ 
                    '& .MuiOutlinedInput-root': {
                        '&.Mui-error fieldset': {
                            borderColor: 'error.main',
                        },
                    },
                }}
            />
            <Button variant="contained" color="primary" onClick={validate}>
                Validate Key
            </Button>
            <Button variant="outlined" color="secondary" onClick={() => window.open('https://the-odds-api.com/#get-access', '_blank')}>
                Get an API Key
            </Button>
            {success && (
                <Alert severity="success" sx={{ mt: 2 }}>
                    Valid API key! Quota remaining: {quota}
                </Alert>
            )}
            {error && !success && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    Invalid API key.
                </Alert>
            )}
        </Paper>
    );
}
