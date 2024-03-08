'use client'

import React, { useState } from 'react'
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

import { registerSchema } from '@/lib/validators/register.schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { useFormStatus } from 'react-dom'

export default function RegisterForm({}: Props) {

  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues:{
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    }
  })

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    console.log(data)
  }

  const { pending } = useFormStatus()

  return (
    <AuthCardWrapper
        title="Register"
        label="Create an account"
        backButtonHref="/login"
        backButtonLabel="Already have an account? Login here"
    >
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6'
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type='email' placeholder='asake.dominic@example.com'/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Asake Dominic'/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type='password' placeholder='*******'/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} type='password' placeholder='*******'/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className='w-full'  disabled={pending}>
          {loading ? 'loading...' : 'Register'}
        </Button>
      </form>
    </Form>
    </AuthCardWrapper>
  )
}