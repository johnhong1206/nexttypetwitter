import { RefreshIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import TweetBox from './TweetBox'
import { Tweet } from '../typings'
import TweetFeed from './TweetFeed'
import { fetchTweets } from '../utils/fetchTweets'
import toast from 'react-hot-toast'

interface Props {
  tweets: Tweet[]
}

function Feeds({ tweets: tweetsProp }: Props) {
  const [tweets, setTweets] = useState<Tweet[]>(tweetsProp)
  const handleRefresh = async () => {
    const refresnToast = toast.loading('Refreshing Tweets...')
    const tweets = await fetchTweets()
    setTweets(tweets)

    toast.success('Feeds Updated', { id: refresnToast })
  }

  return (
    <div className=" col-span-7 max-h-screen overflow-y-scroll scrollbar-hide  lg:col-span-5">
      <div className="flex items-center justify-between">
        <h1 className="p-5 pb-0 text-xl font-bold">Home</h1>
        <RefreshIcon
          onClick={handleRefresh}
          className="mr-5  mt-5 h-8 w-8 cursor-pointer text-twitterBlue transition-all duration-500 ease-out hover:rotate-180 active:scale-125"
        />
      </div>
      <TweetBox setTweets={setTweets} />
      {/* Feed */}

      <div className="">
        {tweets.map((tweet) => (
          <TweetFeed key={tweet._id} tweet={tweet} />
        ))}
      </div>
    </div>
  )
}

export default Feeds
