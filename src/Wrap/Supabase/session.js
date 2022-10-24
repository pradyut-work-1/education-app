import React from 'react'
import { useState } from 'react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

export default function SessionWrapper({ children, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
    return (
    <SessionContextProvider
        supabaseClient={supabaseClient}
        initialSession={pageProps.initialSession}
    >
        {children}
    </SessionContextProvider>
    )
}