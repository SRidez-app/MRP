"use client";

import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight, Shield, Clock, Users, Star, Phone, Mail, MapPin, Target, Award, TrendingUp, Heart, Zap } from 'lucide-react';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    // Handle anchor link scrolling after component mounts
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    }

    return () => observer.disconnect();
  }, []);

  const coreValues = [
    {
      number: "01",
      title: "Speed and Precision",
      description: "We understand that time is money in your business. Our streamlined processes deliver accurate quotes and coverage decisions quickly, without sacrificing attention to detail.",
      
    },
    {
      number: "02", 
      title: "Entrepreneurial Grit",
      description: "We think like business owners because many of our clients are entrepreneurs. We bring creative problem-solving and determination to every challenge.",
      
    },
    {
      number: "03",
      title: "Client-First Mentality", 
      description: "Your success is our success. Every decision we make starts with one question: 'How does this benefit our clients?' Your needs always come first.",
   
    },
    {
      number: "04",
      title: "Radical Transparency",
      description: "No hidden fees, no confusing jargon, no surprises. We believe in clear communication and honest pricing so you always know where you stand.",

    },
    {
      number: "05",
      title: "Long-Term Relationships",
      description: "We're not here for quick transactions. We invest in lasting partnerships, growing alongside your business and adapting as your needs evolve.",
     
    }
  ];

  const highlights = [
    {
      stat: "A+",
      title: "Rated Carriers",
      description: "We only work with financially stable, highly-rated insurance companies"
    },
    {
      stat: "$0",
      title: "Hidden Fees", 
      description: "Transparent pricing with no surprise charges or hidden costs"
    },
    {
      stat: "100%",
      title: "Satisfaction Focus",
      description: "Every client relationship is built to last, not just for quick sales"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        /* Fluid Responsive Scaling - Works on ALL screen sizes */
        :root {
          --fluid-spacing-xs: clamp(0.5rem, 1vw, 1rem);
          --fluid-spacing-sm: clamp(1rem, 2vw, 1.5rem);
          --fluid-spacing-md: clamp(1.5rem, 3vw, 2rem);
          --fluid-spacing-lg: clamp(2rem, 4vw, 3rem);
          --fluid-spacing-xl: clamp(3rem, 6vw, 5rem);
        }
        
        /* Ensure smooth scaling on ultra-wide monitors */
        @media (min-width: 2000px) {
          .responsive-container {
            max-width: 1920px;
            margin-left: auto;
            margin-right: auto;
          }
        }
        
        /* Prevent overflow on any screen */
        * {
          box-sizing: border-box;
        }
      `}</style>
      
      {/* Hero Section - Full Width Background */}
      <section ref={heroRef} className="relative bg-white py-[clamp(3rem,8vw,5rem)] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/about.png" 
            alt="About Moxie Risk Partners - Professional insurance team"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        {/* Hero Content */}
        <div className="responsive-container relative max-w-[min(90rem,95vw)] mx-auto px-[clamp(1rem,3vw,2rem)]">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-white leading-tight mb-[clamp(1rem,2vw,1.5rem)]">
              About Moxie Risk Partners
            </h1>
            
            <p className="text-[clamp(1rem,1.5vw,1.5rem)] text-white/90 leading-relaxed mb-[clamp(2rem,4vw,3rem)] max-w-[min(64rem,90vw)] mx-auto">
              We're a dedicated team of insurance professionals who believe in moving fast, 
              speaking plainly, and delivering results that matter to your business.
            </p>

            {/* Hero Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-[clamp(2rem,4vw,4rem)]">
              <div className="text-center">
                <div className="text-[clamp(2rem,4vw,3rem)] font-bold text-transparent bg-gradient-to-r from-[#D4B06B] to-[#B8893D] bg-clip-text mb-2">
                  26+
                </div>
                <div className="text-white/90 font-semibold text-[clamp(0.875rem,1.2vw,1rem)]">Years Experience</div>
              </div>
              
              <div className="text-center">
                <div className="text-[clamp(2rem,4vw,3rem)] font-bold text-transparent bg-gradient-to-r from-[#D4B06B] to-[#B8893D] bg-clip-text mb-2">
                  100%
                </div>
                <div className="text-white/90 font-semibold text-[clamp(0.875rem,1.2vw,1rem)]">Transparent</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-[clamp(3rem,8vw,5rem)] bg-white">
        <div className="responsive-container max-w-[min(90rem,95vw)] mx-auto px-[clamp(1rem,3vw,2rem)]">
          
          <div className="mb-[clamp(2rem,4vw,4rem)]">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-gray-900 mb-4 leading-tight">
              Our Story
            </h2>
          </div>

          <div className="space-y-[clamp(2rem,4vw,3rem)]">
            {/* Story Intro */}
            <div className="text-center">
              <p className="text-[clamp(1.25rem,2vw,1.875rem)] text-[#B8893D] leading-relaxed max-w-[min(80rem,90vw)] mx-auto font-medium">
                The trucking and logistics industry moves America, but finding reliable insurance shouldn't slow you down.
              </p>
            </div>

            {/* Story Columns */}
            <div className="grid lg:grid-cols-2 gap-[clamp(2rem,4vw,3rem)]">
              <div className="space-y-[clamp(1rem,2vw,1.5rem)]">
                <h3 className="text-[clamp(1.25rem,2vw,1.5rem)] font-bold text-gray-900">Why We Started</h3>
                <div className="space-y-4 text-[clamp(1rem,1.2vw,1.125rem)] text-gray-600 leading-relaxed">
                  <p>
                    Too many businesses struggle with complicated processes, unclear terms, and agents who don't understand 
                    the unique challenges of commercial transportation, manufacturing, and public sector operations. 
                    That's why we created Moxie Risk Partners.
                  </p>
                  <p>
                    With over 26 years of combined industry experience, our team understands what businesses need: 
                    fast responses, competitive rates, and coverage you can count on across all sectors.
                  </p>
                </div>
              </div>
              
              <div className="space-y-[clamp(1rem,2vw,1.5rem)]">
                <h3 className="text-[clamp(1.25rem,2vw,1.5rem)] font-bold text-gray-900">Who We Are</h3>
                <div className="space-y-4 text-[clamp(1rem,1.2vw,1.125rem)] text-gray-600 leading-relaxed">
                  <p>
                    We're based in the heart of the Midwest because we know this region. We understand the routes, 
                    the weather challenges, the regulations, and most importantly, the hardworking people who keep 
                    goods moving and businesses running across America.
                  </p>
                  <p>
                    Every member of our team brings real-world experience across transportation, manufacturing, 
                    public entities, and commercial sectors with a genuine commitment to helping 
                    businesses protect what matters most.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission" className="py-[clamp(3rem,8vw,5rem)] bg-gray-50">
        <div className="responsive-container max-w-[min(90rem,95vw)] mx-auto px-[clamp(1rem,3vw,2rem)]">
          <div className="grid lg:grid-cols-2 gap-[clamp(2rem,5vw,5rem)]">
            
            {/* Mission */}
            <div className="space-y-[clamp(1rem,2vw,1.5rem)]">
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-gray-900 leading-tight">
                Our Mission
              </h2>
              <p className="text-[clamp(1rem,1.5vw,1.25rem)] text-gray-600 leading-relaxed">
                To provide fast, reliable, and transparent insurance solutions that move as fast as our clients do. 
                We believe insurance should protect your business, not complicate it.
              </p>
            </div>
            
            {/* Vision */}
            <div className="space-y-[clamp(1rem,2vw,1.5rem)]">
              <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-gray-900 leading-tight">
                Our Vision
              </h2>
              <p className="text-[clamp(1rem,1.5vw,1.25rem)] text-gray-600 leading-relaxed">
                To be the most trusted and efficient commercial insurance agency in the Nation. 
                We're building the future of business insurance, one relationship at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Expertise Section */}
      <section id="expertise" className="py-[clamp(3rem,8vw,5rem)] bg-white">
        <div className="responsive-container max-w-[min(90rem,95vw)] mx-auto px-[clamp(1rem,3vw,2rem)]">
          
          <div className="mb-[clamp(2rem,4vw,4rem)]">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-gray-900 mb-4 leading-tight">
              Our Industry Expertise
            </h2>
            <p className="text-[clamp(1rem,1.5vw,1.25rem)] text-gray-600 max-w-[min(64rem,90vw)] mb-6">
              These aren't just words on a wall - they're the principles that guide every interaction, 
              every quote, and every decision we make.
            </p>
          </div>

          <div className="space-y-[clamp(1rem,2vw,2rem)]">
            {coreValues.map((value, index) => {
              
              return (
                <div key={index} className="flex items-start space-x-[clamp(1rem,2vw,1.5rem)] p-[clamp(1rem,2vw,2rem)] bg-gray-50 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  
                  {/* Number Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-[clamp(3rem,4vw,4rem)] h-[clamp(3rem,4vw,4rem)] bg-gradient-to-br from-[#B8893D] to-[#B8893D] rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-[clamp(1rem,1.5vw,1.25rem)]">{value.number}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-[clamp(1.25rem,2vw,1.5rem)] font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-[clamp(1rem,1.2vw,1.125rem)] text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose" className="py-[clamp(3rem,8vw,5rem)] bg-gray-50">
        <div className="responsive-container max-w-[min(90rem,95vw)] mx-auto px-[clamp(1rem,3vw,2rem)]">
          
          <div className="text-center mb-[clamp(2rem,4vw,4rem)]">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-gray-900 mb-4 leading-tight">
              Why Choose Moxie Risk Partners
            </h2>
            <p className="text-[clamp(1rem,1.5vw,1.25rem)] text-gray-600 max-w-[min(64rem,90vw)] mx-auto mb-6">
              We've built our reputation on delivering results for businesses just like yours.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-[clamp(1.5rem,3vw,2rem)]">
            {highlights.map((highlight, index) => (
              <div key={index} className="text-center p-[clamp(1.5rem,3vw,2rem)] bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <div className="text-[clamp(2.5rem,5vw,4rem)] font-bold text-transparent bg-gradient-to-r from-[#B8893D] to-[#B8893D] bg-clip-text mb-4">
                  {highlight.stat}
                </div>
                <h3 className="text-[clamp(1.25rem,2vw,1.5rem)] font-bold text-gray-900 mb-4">
                  {highlight.title}
                </h3>
                <p className="text-[clamp(1rem,1.2vw,1.125rem)] text-gray-600 leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-[clamp(3rem,8vw,5rem)] bg-white">
        <div className="responsive-container max-w-[min(64rem,95vw)] mx-auto px-[clamp(1rem,3vw,2rem)] text-center">
          <div className="space-y-[clamp(1.5rem,3vw,2rem)]">
            <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold text-gray-900 leading-tight">
              Ready to Experience the 
              <span className="block text-transparent bg-gradient-to-r from-[#B8893D] to-[#B8893D] bg-clip-text">
                Moxie Difference?
              </span>
            </h2>
            
            <p className="text-[clamp(1rem,1.5vw,1.25rem)] text-gray-600 leading-relaxed max-w-[min(48rem,90vw)] mx-auto">
              Join the growing number of businesses across trucking, manufacturing, public entities, and 
              commercial sectors who trust us with their insurance needs. Let's get started on your quote today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/quote-form" 
                className="bg-gradient-to-r from-[#B8893D] to-[#B8893D] hover:from-[#A87A32] hover:to-[#9A7030] text-white px-[clamp(1.5rem,3vw,2rem)] py-[clamp(0.75rem,1.5vw,1rem)] rounded-lg font-bold text-[clamp(0.95rem,1.2vw,1.125rem)] min-h-[3rem] transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center group"
              >
                Get Your Quote
               
              </a>
              
              <a 
                href="tel:+15155817187" 
                className="border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white px-[clamp(1.5rem,3vw,2rem)] py-[clamp(0.75rem,1.5vw,1rem)] rounded-lg font-bold text-[clamp(0.95rem,1.2vw,1.125rem)] min-h-[3rem] transition-all duration-300 flex items-center justify-center"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call (515) 581-7187
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;