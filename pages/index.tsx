import type { GetServerSideProps } from 'next'
import Head from 'next/head'
import dynamic from 'next/dynamic'

// comment
const Feeds: any = dynamic(() => import('../components/Feeds'))

const SideBar: any = dynamic(() => import('../components/SideBar'))

const Widgets: any = dynamic(() => import('../components/Widgets'))

// types && util && other
import { Tweet } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'
import { Toaster } from 'react-hot-toast'

interface Props {
  tweets: Tweet[]
}

const Home = ({ tweets }: Props) => {
  return (
    <div className=" mx-auto max-h-screen overflow-hidden lg:max-w-6xl">
      <Head>
        <title>ZH Twitter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster position="top-center" reverseOrder={false} />

      <main className="grid grid-cols-9">
        <SideBar />
        <Feeds tweets={tweets} />
        <Widgets />
      </main>
    </div>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const tweets = await fetchTweets()
  return {
    props: { tweets },
  }
}
