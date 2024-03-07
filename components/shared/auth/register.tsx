import React from 'react'
import AuthCardWrapper from './auth-card-wrapper'

type Props = {}

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