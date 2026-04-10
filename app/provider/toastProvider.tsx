'use client'

import React from 'react'
import { Toaster } from "react-hot-toast"

type Props = {
   children: React.ReactNode
}

export default function ToastProvider({ children }: Props) {
   return (
      <>
         <Toaster
            position="top-center"
            toastOptions={{
               style: {
                  zIndex: 2147483647, // ✅ above everything
               },
            }}
         />
         {children}
      </>
   )
}
