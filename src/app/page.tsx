import Contact from '@/components/Contact'
import Hero from '@/components/Hero'
import Portfolio from '@/components/Portfolio'
import Process from '@/components/Process'
import Services from '@/components/Services'
import WhyChooseUs from '@/components/WhyChooseUs'
import React from 'react'

const page = () => {
  return (
    <div className="min-h-screen">
     <Hero />
     <Services />
     <WhyChooseUs />
     <Portfolio />
     <Process />
     <Contact />
    </div>
  )
}

export default page
