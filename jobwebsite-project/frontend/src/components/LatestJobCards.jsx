import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { MapPin, Briefcase } from 'lucide-react'
import { Button } from './ui/button'



const LatestJobCards = ({job}) => {
const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className='p-6 rounded-lg bg-white border border-gray-200 hover:border-secondary hover:shadow-lg transition-all cursor-pointer'>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className='font-bold text-lg text-primary'>{job?.title}</h3>
          <p className='text-sm text-textSubtle font-medium'>{job?.company?.name}</p>
        </div>
        <Badge className="bg-primary/10 text-primary hover:bg-primary/10" variant="ghost">{job?.jobType}</Badge>
      </div>
      <div className="flex items-center gap-4 text-sm text-textSubtle mb-4">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{job?.location || 'Remote'}</span>
        </div>
      </div>
      <Button className="w-full bg-secondary hover:bg-secondary-600 text-white">Apply Now</Button>
    </div>
  )
}

export default LatestJobCards