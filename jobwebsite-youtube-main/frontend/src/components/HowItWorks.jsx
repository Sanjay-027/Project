import React from 'react'
import { Search, FileText, CheckCircle } from 'lucide-react'

const HowItWorks = () => {
  return (
    <section className="max-w-6xl mx-auto my-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">How it works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg border border-gray-100 text-center">
          <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
            <Search />
          </div>
          <h3 className="font-semibold text-lg">Search roles</h3>
          <p className="text-sm text-gray-600 mt-2">Find jobs by title, location or company with smart filters and recommendations.</p>
        </div>

        <div className="p-6 rounded-lg border border-gray-100 text-center">
          <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-secondary/10 text-secondary mb-4">
            <FileText />
          </div>
          <h3 className="font-semibold text-lg">Apply instantly</h3>
          <p className="text-sm text-gray-600 mt-2">One-click applications and saved profiles make applying simple and fast.</p>
        </div>

        <div className="p-6 rounded-lg border border-gray-100 text-center">
          <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-accent/10 text-accent mb-4">
            <CheckCircle />
          </div>
          <h3 className="font-semibold text-lg">Interview & hire</h3>
          <p className="text-sm text-gray-600 mt-2">Track your application status and get notified when recruiters reach out.</p>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
