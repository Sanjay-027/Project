import React from 'react'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'

const CTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="max-w-6xl mx-auto my-12 px-4 text-center">
      <div className="p-10 rounded-lg bg-secondary/5">
        <h2 className="text-2xl font-bold mb-3">Ready to find your next role?</h2>
        <p className="text-gray-600 mb-6">Browse thousands of roles and apply in seconds.</p>
        <Button className="bg-secondary text-white" onClick={()=>navigate('/jobs')}>Browse Jobs</Button>
      </div>
    </section>
  )
}

export default CTASection
