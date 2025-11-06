import axios from "axios";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Navbar from "./shared/Navbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../../redux/jobSlice";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Application_API_END_POINT, JOB_API_END_POINT } from "../../utils/constant.js";

const JobDescription = () => {
    const {singleJob}= useSelector(store=>store.job);
    const {user} = useSelector(store=>store.auth)
const isIntiallyApplied=singleJob?.applications.some(application=>application.applicant ===user?._id) || false;
const [isApplied,setIsApplied] = useState(isIntiallyApplied)
    const params = useParams();
    const jobId = params.id;
    const dispatch= useDispatch();

    const applyJobHandler = async()=>{
        try{
  const res = await axios.get(`${Application_API_END_POINT}/apply/${jobId}`,{withCredentials:true})
  console.log(res.data)
  if(res.data.success){
    setIsApplied(true)
    const updateSinglejob = {...singleJob,applications:[...singleJob.applications,{applicant:user?._id}]};
    dispatch(setSingleJob(updateSinglejob))
    toast.success(res.data.message)
  }
        }catch(error){
            console.log(error);
            toast.error(error.response.data.message)
            
        }
    }
    useEffect(()=>{
        const fetchSingleJob = async () =>{
            try{
 const res = await axios(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
 if(res.data.success){  

    dispatch(setSingleJob(res.data.job))
    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id))
 }
            }catch(error){
                console.log(error);
                
            }
        }
        fetchSingleJob();
    },[jobId,dispatch,user?._id])
    return (
        <div className="bg-bgLight min-h-screen">
            <Navbar />
            <div className="max-w-5xl mx-auto py-10 px-4">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h1 className="font-bold text-3xl text-primary mb-3">{singleJob?.title}</h1>
                            <div className="flex gap-2 flex-wrap">
                                <Badge className={'bg-primary/10 text-primary hover:bg-primary/10'} variant="ghost">{singleJob?.position} Positions</Badge>
                                <Badge className={'bg-secondary/10 text-secondary hover:bg-secondary/10'} variant="ghost">{singleJob?.jobType}</Badge>
                                <Badge className={'bg-green-100 text-green-700 hover:bg-green-100'} variant="ghost">{singleJob?.salary}LPA</Badge>
                            </div>
                        </div>
                        <Button 
                     onClick={isApplied ? null : applyJobHandler}
                            disabled={isApplied} className={`rounded-lg ${isApplied ? 'bg-gray-500 cursor-not-allowed text-white' : 'bg-secondary hover:bg-secondary-600 text-white'}`}>{isApplied ? "Application Sent" : "Apply Now"}</Button>
                    </div>
                    
                    <h2 className="border-b-2 border-b-gray-200 font-bold text-xl text-primary py-4 mb-6">Job Description</h2>
                    <div className="space-y-4">
                        <div className="flex items-start">
                            <h3 className="font-bold text-textDark w-40">Role:</h3>
                            <span className="text-textSubtle">{singleJob?.title}</span>
                        </div>
                        <div className="flex items-start">
                            <h3 className="font-bold text-textDark w-40">Location:</h3>
                            <span className="text-textSubtle">{singleJob?.location || 'Remote'}</span>
                        </div>
                        <div className="flex items-start">
                            <h3 className="font-bold text-textDark w-40">Description:</h3>
                            <span className="text-textSubtle">{singleJob?.description}</span>
                        </div>
                        <div className="flex items-start">
                            <h3 className="font-bold text-gray-900 w-40">Experience:</h3>
                            <span className="text-gray-700">{singleJob?.experience} yrs</span>
                        </div>
                        <div className="flex items-start">
                            <h3 className="font-bold text-gray-900 w-40">Salary:</h3>
                            <span className="text-gray-700">{singleJob?.salary}LPA</span>
                        </div>
                        <div className="flex items-start">
                            <h3 className="font-bold text-gray-900 w-40">Total Applicants:</h3>
                            <span className="text-gray-700">{singleJob?.applications?.length}</span>
                        </div>
                        <div className="flex items-start">
                            <h3 className="font-bold text-gray-900 w-40">Posted Date:</h3>
                            <span className="text-gray-700">{singleJob?.createdAt.split("T")[0]}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default JobDescription;