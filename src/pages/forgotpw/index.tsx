import React from 'react'
import Head from 'next/head'
import Header from '@/components/Header'
import Input from '@/components/Input/input'
import Button from '@/components/Button/Button'
import Link from 'next/link'

function forgotPassword() {
  return (
    <>
    <Head>
      <title>Forgot Password | QuizApp</title>
      <meta
        name="description"
        content="Login to QuizApp and create your own quizzes. Share and challenge the others."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col gap-3 justify-center items-center">
        <h1 className="text-2xl text-center">Forgot Password</h1>
        <div className="flex flex-col gap-3 w-80">
          <Input name="email" placeholder="E-mail" />
          <Button name='Send' color="#107eeb" />
          <span className="text-center">
            Remember password?{" "}
            <Link href="/login" className="text-[#107eeb] hover:text-blue-600">
              Login
            </Link>
          </span>
        </div>
      </div>
    </main>
  </>
  )
}

export default forgotPassword