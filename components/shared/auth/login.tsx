'use client'

import { useState } from 'react'
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

import { LoginSchema } from '@/lib/validators/login.schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { useFormStatus } from 'react-dom'

export default function LoginForm({}: Props) {
  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues:{
      email: "",
      password: "",
    }
  })

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    setLoading(false)
    console.log(data)
  }

  const { pending } = useFormStatus()

  return (
    <AuthCardWrapper
        title="Login"
        label="Login to your account"
        backButtonHref="/register"
        backButtonLabel="Don't have an account yet? Register here"
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
        </div>
        <Button type="submit" className='w-full' disabled={pending}>
          {loading ? 'loading...' : 'Login'}
        </Button>
      </form>
    </Form>
    </AuthCardWrapper>
  )
}