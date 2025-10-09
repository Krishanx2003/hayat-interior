"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MapPin, Mail, Phone, CheckCircle2 } from "lucide-react";

interface FormData {
  name: string;
  contact: string;
  email: string;
  address: string;
  projectType: string;
  propertyType: string;
  totalArea: string;
  numRooms: string;
  budget: string;
  timeline: string;
  message: string;
}

const ContactUs = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    contact: "",
    email: "",
    address: "",
    projectType: "",
    propertyType: "",
    totalArea: "",
    numRooms: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (validateStep1()) {
      setStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateStep1 = () => {
    const requiredFields = ["name", "contact", "email", "address", "projectType", "propertyType"];
    for (const field of requiredFields) {
      if (!formData[field as keyof FormData]) {
        alert("Please fill in all required fields");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Failed to submit form. Please try again.");
        return;
      }

      setIsSubmitted(true);

      setTimeout(() => {
        setFormData({
          name: "",
          contact: "",
          email: "",
          address: "",
          projectType: "",
          propertyType: "",
          totalArea: "",
          numRooms: "",
          budget: "",
          timeline: "",
          message: "",
        });
        setStep(1);
        setIsSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      alert("There was an error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 bg-gradient-to-b from-[#fffefa] to-[#fff9f0] w-full min-h-screen">
      {/* Intro Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pt-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Info Section */}
          <div className="flex flex-col justify-center gap-10">
            <div>
              <h1 className="font-bold text-[#18191f] text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                Let’s Design Your Perfect Space
              </h1>
              <p className="text-[#4a4a4a] text-lg md:text-xl leading-relaxed">
                At <strong>Hayat Interior</strong>, we turn your dreams into design.  
                Whether it’s your home, office, or a complete renovation, our expert designers  
                are here to bring elegance, comfort, and functionality to every corner of your space.
              </p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="font-bold text-[#18191f] text-xl mb-4 flex items-center gap-2">
                  VISIT OUR STUDIO
                </h3>
                <div className="flex items-start gap-4 pl-2">
                  <MapPin className="text-[#996830] w-6 h-6 mt-1 flex-shrink-0" />
                  <p className="text-base md:text-lg text-[#4a4a4a] leading-relaxed">
                    Office No. G-02, Ground Floor,  
                    <br /> Hayat Interior, Nawada, Delhi NCR
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-[#18191f] text-xl mb-4 flex items-center gap-2">
                  EMAIL US
                </h3>
                <div className="flex items-center gap-4 pl-2">
                  <Mail className="text-[#996830] w-6 h-6 flex-shrink-0" />
                  <a
                    href="mailto:hello@hayatinterior.com"
                    className="text-base md:text-lg text-[#4a4a4a] hover:text-[#996830] transition-colors"
                  >
                    hello@hayatinterior.com
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-[#18191f] text-xl mb-4 flex items-center gap-2">
                  CALL US
                </h3>
                <div className="flex items-center gap-4 pl-2">
                  <Phone className="text-[#996830] w-6 h-6 flex-shrink-0" />
                  <a
                    href="tel:+919876543210"
                    className="text-base md:text-lg text-[#4a4a4a] hover:text-[#996830] transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Image
                  src={ "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg"}
                alt="Luxury Interior Living Room"
                className="w-full h-64 md:h-72 rounded-2xl object-cover hover:scale-105 transition-transform shadow-lg"
                width={280}
                height={280}
              />
              <Image
                  src={ "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg"}
                alt="Modern Kitchen Design"
                className="w-full h-64 md:h-72 rounded-2xl object-cover hover:scale-105 transition-transform shadow-lg"
                width={280}
                height={280}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Image
                  src={ "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg"}
                alt="Contemporary Bedroom Design"
                className="w-full h-80 md:h-96 rounded-2xl object-cover hover:scale-105 transition-transform shadow-lg"
                width={350}
                height={350}
              />
              <Image
                 src={ "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg"}
                alt="Luxury Villa Interior"
                className="w-full h-80 md:h-96 rounded-2xl object-cover hover:scale-105 transition-transform shadow-lg"
                width={350}
                height={350}
              />
              <Image
                src={ "https://i.pinimg.com/736x/64/52/a6/6452a6bc5e59451b7321c954b03652c0.jpg"}
                alt="Elegant Office Space"
                className="w-full h-80 md:h-96 rounded-2xl object-cover hover:scale-105 transition-transform shadow-lg"
                width={350}
                height={350}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-5xl mx-auto mt-24 px-6 md:px-12">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
          {!isSubmitted ? (
            <>
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#18191f] mb-4">
                  Start Your Design Journey with Us
                </h2>
                <p className="text-base md:text-lg text-[#5a5a5a] leading-relaxed">
                  Tell us a bit about your dream project — be it a cozy apartment makeover, 
                  a luxury villa, or a modern workspace.  
                  Our <span className="text-[#996830] font-semibold">Hayat Interior</span> experts will connect with you  
                  within 24 hours for a complimentary consultation.
                </p>
              </div>

              {/* Step-based Form */}
              {step === 1 && (
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name *"
                    value={formData.name}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                  />
                  <input
                    type="text"
                    name="contact"
                    placeholder="Contact Number *"
                    value={formData.contact}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address *"
                    value={formData.address}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                  />
                  <input
                    type="text"
                    name="projectType"
                    placeholder="Project Type *"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                  />
                  <input
                    type="text"
                    name="propertyType"
                    placeholder="Property Type *"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={nextStep}
                    className="bg-[#996830] text-white p-3 rounded-lg mt-4"
                  >
                    Next
                  </button>
                </div>
              )}

              {step === 2 && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <input
                    type="text"
                    name="totalArea"
                    placeholder="Total Area (sq.ft)"
                    value={formData.totalArea}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                  />
                  <input
                    type="text"
                    name="numRooms"
                    placeholder="Number of Rooms"
                    value={formData.numRooms}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                  />
                  <input
                    type="text"
                    name="budget"
                    placeholder="Budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                  />
                  <input
                    type="text"
                    name="timeline"
                    placeholder="Timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                  />
                  <textarea
                    name="message"
                    placeholder="Additional Message"
                    value={formData.message}
                    onChange={handleChange}
                    className="border p-3 rounded-lg"
                  />
                  <div className="flex gap-4 mt-4">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="bg-gray-300 text-gray-700 p-3 rounded-lg"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-[#996830] text-white p-3 rounded-lg"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              )}
            </>
          ) : (
            <div className="text-center py-12 animate-fadeIn">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-12 h-12 text-green-600" />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-[#18191f] mb-4">
                Thank You for Reaching Out!
              </h3>
              <p className="text-lg text-[#5a5a5a] mb-2">
                Your details have been received successfully.
              </p>
              <p className="text-base text-[#5a5a5a]">
                Our design team will get in touch within 24 hours to discuss your project.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
