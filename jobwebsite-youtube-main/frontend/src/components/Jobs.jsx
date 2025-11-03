import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const Jobs = () => {
  useGetAllJobs();
  const {allJobs,searchedQuery} = useSelector(store=>store.job);
  const [filterJobs,setFilterJobs] = useState(allJobs);
  
  const getSalaryRange = (salaryText) => {
    if (salaryText === "0-40k") return { min: 0, max: 40000 };
    if (salaryText === "42-1akh") return { min: 42000, max: 100000 };
    if (salaryText === "1lakh to 5 lakh") return { min: 100000, max: 500000 };
    return null;
  };
  
  useEffect(()=>{
    if(searchedQuery){
      const queries = searchedQuery.split(" ").filter(q => q);
      const filteredJobs = allJobs.filter((job)=>{
        return queries.every(query => {
          // Check if it's a salary range filter
          const salaryRange = getSalaryRange(query);
          if (salaryRange) {
            return job.salary >= salaryRange.min && job.salary <= salaryRange.max;
          }
          // Otherwise check title, description, location
          return job.title.toLowerCase().includes(query.toLowerCase()) || 
                 job.description.toLowerCase().includes(query.toLowerCase()) || 
                 job.location.toLowerCase().includes(query.toLowerCase());
        });
      });
      setFilterJobs(filteredJobs);
    }else{
      setFilterJobs(allJobs);
    }
  },[allJobs,searchedQuery]);
  return (
    <div className="bg-bgLight min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto mt-5 px-4">
        <div className="flex gap-5">
          <div className="w-64 flex-shrink-0">
            <FilterCard />
          </div>
        
        {filterJobs.length <= 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <span className="text-textSubtle text-lg">Job Not Found</span>
          </div>
        ) : (
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            <h1 className="text-2xl font-bold text-primary mb-6">All Jobs ({filterJobs.length})</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filterJobs.map((job) => (
                <div key={job?._id}>
                  <Job job={job} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Jobs;
