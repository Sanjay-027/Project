import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { setSearchedQuery } from '../../redux/jobSlice.js';
// const randomJobs = [1,2,4,5,6,7 ];

const Browse = () => {
  useGetAllJobs();
  const {allJobs} = useSelector(store=>store.job);
  const dispatch = useDispatch();
  useEffect(()=>{
    return()=>{
      dispatch(setSearchedQuery(""))
    }
  },[dispatch])
  return (
    <div className="bg-bgLight min-h-screen">
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10 px-4'>
        <h1 className='font-bold text-2xl text-primary my-10'>Search Results ({allJobs.length})</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            
             {
      allJobs.map((job)=>{
        return(
          <Job key={job._id} job={job}/>
        )
      })
      }
             
        </div>
      </div>
    </div>
  )
}

export default Browse
