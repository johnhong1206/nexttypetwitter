import { SearchIcon } from '@heroicons/react/outline'
import React from 'react'
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from 'react-twitter-embed'

function Widgets() {
  return (
    <div className="col-span-2 mt-2 hidden px-2 lg:inline">
      <div className="mt-2 flex items-center space-x-2 rounded-full bg-gray-100 p-3">
        <SearchIcon className=" h-5 w-5" />
        <input
          className=" bg-transparent text-gray-400 outline-none"
          placeholder="Search..."
        />
      </div>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="elonmusk"
        options={{ height: 1000 }}
      />
    </div>
  )
}

export default Widgets
