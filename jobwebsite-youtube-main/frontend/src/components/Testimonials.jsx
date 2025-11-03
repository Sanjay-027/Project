import React from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Quote } from 'lucide-react'

const testimonials = [
  {
    name: "Sarah K.",
    title: "Project Manager",
    image: "https://i.pravatar.cc/150?img=1",
    quote: "Thanks to this portal, I found and landed my dream job! Highly recommended!"
  },
  {
    name: "Michael R.",
    title: "Software Engineer",
    image: "https://i.pravatar.cc/150?img=3",
    quote: "Quick, easy, and effective. The application process was seamless!"
  }
]

const Testimonials = () => {
  return (
    <section className="py-12 bg-bgLight">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-primary mb-8">Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-textDark">{testimonial.name}</h4>
                      <p className="text-sm text-textSubtle">{testimonial.title}</p>
                    </div>
                    <Quote className="w-8 h-8 text-secondary/20" />
                  </div>
                  <p className="text-sm text-textDark italic">"{testimonial.quote}"</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
