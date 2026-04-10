import React from 'react'

type Props = Readonly<{
    children: React.ReactNode
}>


export default function AuthLayout({children}: Props) {
    return <>
    {children}
    </>
}