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

import { LoginSchema, loginSchema } from '@/lib/validators/login.schema'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import axios from 'axios';
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Text } from "rizzui"


export default function LoginForm({}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})


  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues:{
      userId: "",
      password: "",
      language: "en",
    }
  })

  

  const onSubmit = async (data: LoginSchema) => {
    setLoading(true);
    setData(data);
    console.log(data);
  
    try {
      interface LoginResponse {
        // isSuccess: boolean;
        // jwtToken?: string;
        // message?: string;
        // data?: any

        isSuccess: true;
        message: string;
        messageCode: string;
        language: string;
        jwtToken: string;
        data: any;
      }
  
      const response: LoginResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/Account/Login`, data);
      
  
      const d = response.data;
      console.log(d)
      if (d.isSuccess === true) {
        console.log(d.message);
        router.push("/dashboard");
        toast.success(`${d.message} You are logged In.`);
        setLoading(!loading);
        localStorage.setItem("token", response.jwtToken.toString()); // Optional chaining
        console.log(localStorage.getItem("token"));
      } else {
        console.log(d.message);
        setLoading(!loading);
      }
    } catch (error) {
      // Handle errors here
      // toast.error(`${error.message} You are logged In.`)
    
      // toast.error(`${error.message} You are logged In.`);
      // if (
      //   typeof error === "object" &&
      //   error &&
      //   "message" in error &&
      //   typeof error.message === "string"
      // )
      // if (axios.isAxiosError(error)) {
      //   if (error.response) {
      //     // Handle server-side errors
      //     console.error('Server error:', error.message);
      //   } else if (error.request) {
      //     // Handle request-related errors
      //     console.error('Request error:', error.request);
      //   } else {
      //     // Handle other Axios errors
      //     console.error('Axios error:', error.message);
      //   }
      // }
    }finally {
       setLoading(false);
     }
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
            name='userId'
            render={({ field }) => (
              <FormItem>
                <FormLabel>UserId</FormLabel>
                <FormControl>
                  <Input {...field} type='text' placeholder='asake.dominic@example.com'/>
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
        {/* <Text className=" leading-[1.85] text-gray-700 md:leading-loose lg:pe-8 2xl:pe-14">
            Hello Poland!
        </Text> */}
    <Toaster />
      </form>
    </Form>
    </AuthCardWrapper>
  )
}