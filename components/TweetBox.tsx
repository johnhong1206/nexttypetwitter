import {
  CalendarIcon,
  EmojiHappyIcon,
  LocationMarkerIcon,
  PhotographIcon,
  SearchCircleIcon,
} from '@heroicons/react/outline'
import { useSession } from 'next-auth/react'
import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { Tweet, TweetBody } from '../typings'
import { fetchTweets } from '../utils/fetchTweets'

interface Props {
  setTweets: Dispatch<SetStateAction<Tweet[]>>
}

function TweetBox({ setTweets }: Props) {
  const [input, setInput] = useState<string>('')
  const { data: session } = useSession()
  const [imgURLBoxisOpen, setImageURLBoxisOpen] = useState<boolean>(false)
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [imageToUpload, setImageToUpload] = useState<string>('')

  const addImageToTweet = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()

    if (!imageInputRef.current?.value) return

    setImageToUpload(imageInputRef.current.value)
    imageInputRef.current.value = ''
    setImageURLBoxisOpen(false)
  }

  const postTweet = async () => {
    const tweetInfo: TweetBody = {
      text: input,
      username: session?.user?.name || 'Unknown user',
      profileImg: session?.user?.image || 'https://links.papareact.com/gll',
      image: imageToUpload,
    }
    const result = await fetch(`/api/addTweet`, {
      body: JSON.stringify(tweetInfo),
      method: 'POST',
    })
    const json = await result.json()
    const newTweet = await fetchTweets()
    setTweets(newTweet)

    toast.success('Tweet Post Success')

    return json
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    postTweet()
    setInput('')
    setImageToUpload('')
    setImageURLBoxisOpen(false)
  }

  return (
    <div className="flex space-x-2 p-5">
      <img
        src={session?.user?.image || 'https://links.papareact.com/gll'}
        alt={session?.user?.name || 'userimg'}
        className=" mt-4 h-14 w-14 rounded-full object-cover     "
      />
      <div className="flex flex-1 items-center pl-2">
        <form className="flex flex-1 flex-col">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder={`What's Happening?`}
            className=" h-24 w-full text-xl outline-none placeholder:text-xl"
          />
          <div className=" flex items-center">
            <div className=" flex flex-1 space-x-2 text-twitterBlue">
              <PhotographIcon
                onClick={() => setImageURLBoxisOpen(!imgURLBoxisOpen)}
                className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"
              />
              <SearchCircleIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <EmojiHappyIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <CalendarIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
              <LocationMarkerIcon className="h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150" />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!input || !session}
              className=" rounded-full bg-twitterBlue px-5 py-2 font-bold text-white disabled:opacity-40"
            >
              Tweet
            </button>
          </div>
          {imgURLBoxisOpen && (
            <form className="mt-5 flex rounded-lg bg-twitterBlue/80 py-2 px-4">
              <input
                ref={imageInputRef}
                type="text"
                className=" flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                placeholder="Enter Image Url"
              />
              <button
                type="submit"
                onClick={addImageToTweet}
                className="font-bold text-white"
              >
                Add Image
              </button>
            </form>
          )}
          {imageToUpload && (
            <img
              src={imageToUpload}
              alt="image to upload"
              className="mt-10 h-40 w-full rounded-xl object-contain shadow-lg"
            />
          )}
        </form>
      </div>
    </div>
  )
}

export default TweetBox
