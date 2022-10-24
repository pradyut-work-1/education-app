import React from 'react'
import '../styles/globals.css'
import SessionWrapper from '../src/Wrap/Supabase/session'
import { NextUIProvider } from '@nextui-org/react'

export default function App({ Component, pageProps }) {

  return (
    <SessionWrapper pageProps={pageProps}>
      <NextUIProvider>
      <Component {...pageProps} />
      </NextUIProvider>
    </SessionWrapper>
  )
}