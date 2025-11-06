import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';


// let allJobs = [1,2,3,4,5,6,7,8];
const LatestJob = () => {
 
const {allJobs} = useSelector(store=>store.job)
  return (
    <section className='py-12 bg-white'>
      <div className='max-w-6xl mx-auto px-4'>
        <h2 className='text-2xl font-bold text-primary mb-8'>Featured Jobs</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {
         allJobs.length <= 0 ? <span className="text-textSubtle">No Job Available</span>:allJobs?.slice(0,6).map((job)=><LatestJobCards key={job._id} job={job}/>)
        }
        </div>
      </div>
    </section>
  )
}

export default LatestJob