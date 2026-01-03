import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import CustomerSupportRedirect from '~/components/sidebar/CustomerSupportRedirect'
import { auth } from '~/lib/auth'

const page =async () => {
    const session = await auth.api.getSession({
        headers:await headers()
    })

    if(!session){
        redirect("/auth/sign-in")
    }
  return (
   <CustomerSupportRedirect/>
  )
}

export default page