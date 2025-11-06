import React from 'react'
import { Button } from './ui/button'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({job}) => {
  const navigate = useNavigate();
  // const jobId = "12dfgfdbfgghnhnfnhg"
const daysAgoFunction = (mongodbTime) =>{
  const createdAt = new Date(mongodbTime);
  const currentTime = new Date();
  const timeDiffernce = currentTime - createdAt;
  return Math.floor(timeDiffernce/(1000*24*60*60));
}
  
  return (
  <div className='p-5 rounded-lg bg-white border border-gray-200 hover:border-secondary hover:shadow-lg transition-all'>
        <div className='flex items-center justify-between'> 
  <p className='text-sm text-textSubtle' >{daysAgoFunction(job?.createdAt) === 0 ? "Today": `${daysAgoFunction(job?.createdAt)}`} days ago</p>
     </div>
     <div className='flex items-center gap-2 my-3'>
        <Button className="p-6 border-gray-200" variant="outline" size="icon">
            <Avatar>
                <AvatarImage src={job?.company?.logo}/>
            </Avatar>
        </Button>
        <div>
            <h1 className="font-semibold text-textDark">{job?.company?.name}</h1>
            <p className="text-sm text-textSubtle">{job?.location || 'Remote'}</p>
        </div>
     </div>

     <div>
        <h1 className='font-bold text-lg text-primary my-2'>{job?.title}</h1>
  <p className='text-sm text-textDark line-clamp-2'>{job?.description}</p>
     </div>
     <div className='flex items-center gap-2 mt-4 flex-wrap'>
  <Badge className={"bg-primary/10 text-primary hover:bg-primary/10"} variant="ghost">{job?.position} Positions</Badge>
  <Badge className={"bg-gray-100 text-textDark hover:bg-gray-100"} variant="ghost">{job?.jobType}</Badge>
  <Badge className={"bg-secondary/10 text-secondary hover:bg-secondary/10"} variant="ghost">{job?.salary}LPA</Badge>
      </div>
      <div className='mt-4'>
        <Button className="w-full bg-secondary hover:bg-secondary-600 text-white" onClick={()=>navigate(`/description/${job?._id}`)}>View Details & Apply</Button>
      </div>
    </div>
  )
}

export default Job