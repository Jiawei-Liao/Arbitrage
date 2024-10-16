import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { ThemeProvider } from "@mui/material"

import theme from './theme'
import Main from './Main'
import Unsubscribe from './components/Unsubscribe/Unsubscribe'
import PageNotFound from './components/PageNotFound/PageNotFound'

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/Arbitrage" element={<Navigate to="/" replace />} />
                    <Route path="/Unsubscribe/:id" element={<Unsubscribe />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Router>
        </ThemeProvider>
    )
}