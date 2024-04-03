'use client'

const { SnackbarProvider } = require("notistack")

const AlertBox = ({ children }) => {
    return(
        <SnackbarProvider maxSnack={3}>
            {children}
        </SnackbarProvider>
    )
}

export default AlertBox