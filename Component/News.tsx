import { InfoIcon } from 'lucide-react';
import React from 'react'

interface NewsItem {
  heading: string;
  subHeading: string;
}

const newItems:NewsItem[] = [
  {
    heading: "AI startup secures $150 million in Series B funding",
    subHeading: "2h ago - 712 readers"
  },
  {
    heading: "Electric cars outsell diesel in Europe for first time",
    subHeading: "3h ago - 489 readers"
  },
  {
    heading: "Tech firms plan return-to-office push this fall",
    subHeading: "1h ago - 356 readers"
  },
  {
    heading: "New cybersecurity law affects 60% of global firms",
    subHeading: "2h ago - 278 readers"
  },
  {
    heading: "Remote work driving real estate demand in tier-2 cities",
    subHeading: "30m ago - 198 readers"
  }

]

const News = () => {
  return (
    <div className='hidden md:block w-[25%] h-fit bg-white rounded-lg border border-gray-300 '>
      <div className='flex justify-between items-center p-3'>
        <h1 className='font-medium'>ConnectHub News</h1>
        <InfoIcon size={20}/>
      </div>
      <div>
        {
newItems.map((item,index)=>{
  return(
    <div key={index} className='px-3 py-2 hover:bg-gray-100 hover:cursor-pointer'>
      <h1 className='text-sm font-medium'>{item.heading}</h1>
      <p className='text-xs text-gray-600'>{item.subHeading}</p>
    </div>
  )
})        }
      </div>
    </div>
  )
}

export default News