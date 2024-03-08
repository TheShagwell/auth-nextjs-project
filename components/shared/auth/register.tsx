import React from 'react'
import AuthCardWrapper from './auth-card-wrapper'

type Props = {}

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export default function RegisterForm({}: Props) {
  return (
    <AuthCardWrapper
        title="Register"
        label="Create an account"
        backButtonHref="/login"
        backButtonLabel="Already have an account? Login here"
    >
    <div>
        
    </div>
    </AuthCardWrapper>
  )
}