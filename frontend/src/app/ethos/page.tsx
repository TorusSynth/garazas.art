import { Metadata } from 'next';
import React from 'react';
import { RiArtboardLine, RiCommunityLine, RiGlobalLine, RiLightbulbLine, RiHandHeartLine, RiShieldCheckLine, RiTeamLine } from 'react-icons/ri';

export const metadata: Metadata = {
  title: 'Our Ethos | Garazas.art',
  description: 'Learn about the mission, vision, and values that drive Garazas.art - a contemporary art exhibition platform in Vilnius, Lithuania.',
};

export default function EthosPage() {
  return (
    <div className="bg-gray-100 min-h-screen pt-24">
      {/* Header Section - Teletext Style */}
      <div className="bg-[var(--color-primary)] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 inline-block border-b-4 border-white pb-2">OUR ETHOS</h1>
          <p className="text-xl max-w-3xl">
            The guiding principles, mission, and vision behind Garazas.art
          </p>
        </div>
      </div>
      
      {/* About Garazas.art */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-16">
            <div className="teletext-box">
              <h2 className="text-3xl font-bold mb-6 text-[var(--color-primary)] inline-block border-b-2 border-[var(--color-primary)] pb-2">ABOUT GARAZAS.ART</h2>
              <p className="mb-6 text-lg">
                Garazas.art was born out of a simple yet profound need: to offer a space dedicated to contemporary art, alive with experimentation, conversation, and possibility. We took an unassuming garage and transformed it into a welcoming cultural hub where visitors are invited to gather, explore new artistic expressions, and discover emerging voices alongside established creative talents.
              </p>
              <p className="mb-6">
                Our name, "Garazas" (garage in Lithuanian), pays homage to our humble beginnings and reflects our belief that transformative art experiences can emerge from unexpected spaces. Today, we've grown beyond our original location while maintaining the spirit of accessibility, innovation, and community that defined our start.
              </p>
              <p>
                We are dedicated to creating a platform where artists can freely express their ideas, engage with audiences, and contribute to important cultural dialogues. Through our exhibitions, events, and digital presence, we strive to make contemporary art accessible to diverse audiences while challenging conventional thinking.
              </p>
            </div>
          </div>
          
          {/* Mission & Vision Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-16">
            <div className="teletext-box">
              <div className="flex items-center mb-6">
                <RiLightbulbLine className="w-8 h-8 text-[var(--color-primary)] mr-4" />
                <h3 className="text-2xl font-bold text-[var(--color-primary)]">MISSION</h3>
              </div>
              <p className="mb-4">
                Garazas.art is dedicated to showcasing innovative contemporary art that challenges conventions and sparks dialogue about our rapidly evolving world.
              </p>
              <p className="mb-4">
                We provide a platform for emerging and established artists to explore new ideas, media, and methods of engagement with audiences.
              </p>
              <p>
                We are committed to fostering an art ecosystem that is accessible to all, regardless of background or prior art knowledge, while maintaining curatorial excellence and artistic integrity.
              </p>
            </div>
            
            <div className="teletext-box">
              <div className="flex items-center mb-6">
                <RiGlobalLine className="w-8 h-8 text-[var(--color-primary)] mr-4" />
                <h3 className="text-2xl font-bold text-[var(--color-primary)]">VISION</h3>
              </div>
              <p className="mb-4">
                We envision a cultural landscape where contemporary art is accessible, relevant, and central to understanding our shared human experience.
              </p>
              <p className="mb-4">
                Through exhibitions, events, and digital platforms, we aim to build connections between artists, audiences, and communities.
              </p>
              <p>
                We aspire to be a catalyst for cultural exchange and artistic innovation, positioning our region as a vibrant hub in the global contemporary art dialogue while preserving and celebrating our local artistic heritage.
              </p>
            </div>
          </div>
          
          {/* Values Section */}
          <div className="max-w-5xl mx-auto">
            <div className="teletext-box">
              <div className="flex items-center mb-6">
                <RiHandHeartLine className="w-8 h-8 text-[var(--color-primary)] mr-4" />
                <h3 className="text-2xl font-bold text-[var(--color-primary)]">OUR VALUES</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center mb-3">
                    <RiArtboardLine className="w-6 h-6 text-[var(--color-primary)] mr-2" />
                    <h4 className="font-bold text-xl text-[var(--color-primary)]">INNOVATION</h4>
                  </div>
                  <p className="mb-2">We embrace experimentation and new forms of artistic expression.</p>
                  <ul className="list-disc list-inside ml-2 text-sm">
                    <li>Encouraging risk-taking and creative exploration</li>
                    <li>Supporting artists who push boundaries</li>
                    <li>Adopting new technologies and methodologies</li>
                  </ul>
                </div>
                
                <div>
                  <div className="flex items-center mb-3">
                    <RiCommunityLine className="w-6 h-6 text-[var(--color-primary)] mr-2" />
                    <h4 className="font-bold text-xl text-[var(--color-primary)]">INCLUSIVITY</h4>
                  </div>
                  <p className="mb-2">We are committed to representing diverse voices and perspectives.</p>
                  <ul className="list-disc list-inside ml-2 text-sm">
                    <li>Exhibiting artists from varied backgrounds</li>
                    <li>Creating accessible and welcoming spaces</li>
                    <li>Engaging underrepresented communities</li>
                  </ul>
                </div>
                
                <div>
                  <div className="flex items-center mb-3">
                    <RiShieldCheckLine className="w-6 h-6 text-[var(--color-primary)] mr-2" />
                    <h4 className="font-bold text-xl text-[var(--color-primary)]">INTEGRITY</h4>
                  </div>
                  <p className="mb-2">We uphold ethical practices in all aspects of our operations.</p>
                  <ul className="list-disc list-inside ml-2 text-sm">
                    <li>Fair compensation for artists and staff</li>
                    <li>Transparent decision-making processes</li>
                    <li>Environmentally responsible exhibition practices</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Approach Section */}
      <section className="py-16 bg-gray-100/90">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6 inline-block border-b-4 border-[var(--color-primary)] pb-2 text-[var(--color-primary)]">OUR APPROACH</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="teletext-box">
                <h3 className="text-xl font-bold mb-4 text-[var(--color-primary)]">CURATORIAL PHILOSOPHY</h3>
                <p className="mb-4">
                  Our curatorial approach balances artistic excellence with thematic relevance. We seek work that is not only technically accomplished but also conceptually rigorous and socially engaged.
                </p>
                <p>
                  We believe in the power of art to pose questions rather than provide answers, creating spaces for reflection, dialogue, and personal interpretation.
                </p>
              </div>
              
              <div className="teletext-box">
                <h3 className="text-xl font-bold mb-4 text-[var(--color-primary)]">ARTIST RELATIONSHIPS</h3>
                <p className="mb-4">
                  We view our relationship with artists as a collaboration rather than a transaction. We provide resources, guidance, and support throughout the exhibition process.
                </p>
                <p>
                  Beyond exhibition opportunities, we offer professional development, networking, and community building for artists at all career stages.
                </p>
              </div>
              
              <div className="teletext-box">
                <h3 className="text-xl font-bold mb-4 text-[var(--color-primary)]">AUDIENCE ENGAGEMENT</h3>
                <p className="mb-4">
                  We believe art should be accessible without being diluted. Our programming includes educational components that help demystify contemporary art practices.
                </p>
                <p>
                  Through workshops, talks, and digital content, we create multiple entry points for audiences with varying levels of art knowledge.
                </p>
              </div>
              
              <div className="teletext-box">
                <h3 className="text-xl font-bold mb-4 text-[var(--color-primary)]">CULTURAL IMPACT</h3>
                <p className="mb-4">
                  We recognize our responsibility as cultural producers and aim to contribute positively to both our local community and the broader art ecosystem.
                </p>
                <p>
                  Our programs address contemporary issues, foster cross-cultural dialogue, and contribute to the cultural vitality of our region.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Join Us Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="teletext-box max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-[var(--color-primary)]">JOIN OUR MISSION</h2>
            <p className="mb-8 text-lg">
              Garazas.art thrives through the support and participation of our community. Whether you're an artist, art enthusiast, potential collaborator, or supporter, there are many ways to get involved with our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/open-call" className="teletext-button inline-flex items-center justify-center gap-2 px-6 py-3">
                SUBMIT YOUR WORK
                <RiTeamLine />
              </a>
              <a href="mailto:info@garazas.art" className="teletext-button inline-flex items-center justify-center gap-2 px-6 py-3">
                CONTACT US
                <RiTeamLine />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 