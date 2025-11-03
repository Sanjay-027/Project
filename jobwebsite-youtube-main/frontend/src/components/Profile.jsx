import React, { useState } from 'react'
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false)
    const {user} = useSelector(store=>store.auth)
    const isResume = user?.profile?.resume ? true : false;
    
    return (
        <div className="bg-bgLight min-h-screen">
            <Navbar />
            <div className='max-w-4xl mx-auto my-8 px-4'>
                {/* Profile Header Card */}
                <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6'>
                    <div className='flex items-start justify-between'>
                        <div className='flex items-center gap-4'>
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} />
                            </Avatar>
                            <div>
                                <h1 className='font-bold text-2xl text-primary'>{user?.fullName}</h1>
                                <p className="text-sm text-textSubtle mt-1">{user?.role === 'recruiter' ? 'Recruiter' : 'Job Seeker'}</p>
                                {user?.profile?.bio && <p className="text-textDark mt-2">{user?.profile?.bio}</p>}
                            </div>
                        </div>
                        <Button onClick={() => setOpen(true)} size="sm" className="bg-secondary hover:bg-secondary-600">
                            <Pen className="w-4 h-4 mr-2" />
                            Edit
                        </Button>
                    </div>
                    
                    {/* Contact Info */}
                    <div className='flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-200'>
                        <div className='flex items-center gap-2 text-textDark'>
                            <Mail className="w-4 h-4 text-secondary" />
                            <span className="text-sm">{user?.email}</span>
                        </div>
                        <div className='flex items-center gap-2 text-textDark'>
                            <Contact className="w-4 h-4 text-secondary" />
                            <span className="text-sm">{user?.phoneNumber}</span>
                        </div>
                    </div>

                    {/* Skills - Only for Job Seekers */}
                    {user?.role === 'student' && (
                        <div className='mt-6'>
                            <h2 className="font-semibold text-primary mb-3">Skills</h2>
                            <div className='flex items-center gap-2 flex-wrap'>
                                {user?.profile?.skills?.length > 0 ? (
                                    user.profile.skills.map((item, index) => (
                                        <Badge key={index} className="bg-primary/10 text-primary hover:bg-primary/10">
                                            {item}
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="text-sm text-textSubtle">No skills added yet</span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Resume - Only for Job Seekers */}
                    {user?.role === 'student' && (
                        <div className='mt-6'>
                            <h2 className="font-semibold text-primary mb-3">Resume</h2>
                            {isResume ? (
                                <a 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    href={user?.profile?.resume} 
                                    className='text-secondary hover:underline text-sm font-medium inline-flex items-center gap-2'
                                >
                                    📄 {user?.profile?.resumeOriginalName}
                                </a>
                            ) : (
                                <span className="text-sm text-textSubtle">No resume uploaded</span>
                            )}
                        </div>
                    )}
                </div>

                {/* Applied Jobs Section - Only for Job Seekers */}
                {user?.role === 'student' && (
                    <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
                        <h1 className='font-bold text-xl text-primary mb-5'>Applied Jobs</h1>
                        <AppliedJobTable />
                    </div>
                )}
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile;
