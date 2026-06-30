import React from 'react';
import { Target, Eye, Users, Heart, Globe, Award } from 'lucide-react';
import './About.css';

const About = () => {
  const teamMembers = [
    {
      name: 'Sophia Sterling',
      role: 'CEO & Founder',
      bio: 'Visionary entrepreneur with 10+ years of experience in retail tech.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Marcus Vance',
      role: 'Chief Technology Officer',
      bio: 'Tech architect specializing in high-performance cloud and e-commerce platforms.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
    },
    {
      name: 'Elena Rostova',
      role: 'Head of Product Design',
      bio: 'Award-winning UX designer passionate about minimal aesthetics and micro-interactions.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
    }
  ];

  const values = [
    {
      icon: <Heart size={24} />,
      title: 'Customer First',
      description: 'We design every feature and curate every product with our customers experience in mind.'
    },
    {
      icon: <Globe size={24} />,
      title: 'Sustainability',
      description: 'We partner with responsible manufacturers to minimize our environmental footprint.'
    },
    {
      icon: <Award size={24} />,
      title: 'Uncompromised Quality',
      description: 'Every product in our catalog undergoes rigorous quality checks before listing.'
    }
  ];

  return (
    <div className="about-page animate-fade-in">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-title">
            Redefining the <br />
            Shopping <span className="text-gradient">Experience</span>
          </h1>
          <p className="about-subtitle">
            At ShopSphere, we believe shopping should be inspiring, seamless, and premium. We curate the best to elevate your daily life.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story section-padding">
        <div className="container story-grid">
          <div className="story-content">
            <span className="section-tag">Our Journey</span>
            <h2>How ShopSphere Began</h2>
            <p>
              Founded in 2024, ShopSphere started as a small group of designers and tech enthusiasts who wanted to challenge the status quo of online shopping. We noticed that e-commerce was becoming cluttered and generic.
            </p>
            <p>
              We set out to build a platform that combines next-generation design aesthetics (like glassmorphic UI, fluid animations, and dark mode) with a highly curated selection of products. Today, we serve thousands of customers worldwide, delivering happiness one premium package at a time.
            </p>
          </div>
          <div className="story-image-wrapper">
            <div className="story-image-card glass-panel">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="Our Team Collaborating"
                className="story-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="mission-vision-section section-padding">
        <div className="container mission-vision-grid">
          <div className="mission-card glass-panel">
            <div className="mission-icon-wrapper">
              <Target size={28} />
            </div>
            <h3>Our Mission</h3>
            <p>
              To deliver high-quality, curated products with an exceptional, visual customer experience, making premium shopping accessible and delightful for everyone, everywhere.
            </p>
          </div>

          <div className="vision-card glass-panel">
            <div className="mission-icon-wrapper">
              <Eye size={28} />
            </div>
            <h3>Our Vision</h3>
            <p>
              To become the global leader in customer-centric e-commerce, pioneering modern web interfaces, sustainable logistics, and personalized product curations.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Our Core <span className="text-gradient">Values</span></h2>
            <p>The principles that guide our decisions, culture, and products every day.</p>
          </div>

          <div className="values-grid">
            {values.map((val, index) => (
              <div key={index} className="value-card glass-panel">
                <div className="value-icon-circle">
                  {val.icon}
                </div>
                <h3>{val.title}</h3>
                <p>{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section section-padding">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our <span className="text-gradient">Leaders</span></h2>
            <p>The dedicated minds behind ShopSpheres technology, design, and curation.</p>
          </div>

          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card glass-panel glass-panel-hover">
                <div className="team-image-wrapper">
                  <img src={member.image} alt={member.name} className="team-image" />
                </div>
                <div className="team-content">
                  <h3>{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
