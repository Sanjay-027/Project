import React from 'react'
import { Users, ShieldCheck, Sparkles } from 'lucide-react'

const Features = () => {
  return (
    <section className="max-w-6xl mx-auto my-12 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Why choose CareerWave?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-md bg-primary/10 text-primary"><Users /></div>
            <div>
              <h3 className="font-semibold">Verified Employers</h3>
              <p className="text-sm text-gray-600">We verify companies to ensure authentic opportunities.</p>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-md bg-secondary/10 text-secondary"><ShieldCheck /></div>
            <div>
              <h3 className="font-semibold">Secure Applications</h3>
              <p className="text-sm text-gray-600">Your data is secure and only shared with prospective employers.</p>
            </div>
          </div>
        </div>
        <div className="p-6 rounded-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-md bg-accent/10 text-accent"><Sparkles /></div>
            <div>
              <h3 className="font-semibold">Personalized Matches</h3>
              <p className="text-sm text-gray-600">Get role suggestions tailored to your profile and activity.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
