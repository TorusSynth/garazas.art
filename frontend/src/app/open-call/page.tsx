import type { Metadata } from 'next';
import ArtistRegistrationForm from '@/components/forms/ArtistRegistrationForm';
import { RiTeamLine, RiAwardLine, RiGalleryLine } from 'react-icons/ri';

export const metadata: Metadata = {
  title: 'Submit Your Work | Garazas.art',
  description: 'Submit your work for consideration in our upcoming exhibitions and projects. Join our community of contemporary artists.',
};

export default function OpenCallPage() {
  const benefits = [
    {
      icon: <RiGalleryLine className="w-8 h-8 text-primary-600" />,
      title: 'Exhibition Opportunity',
      description: 'Selected artists will be featured in our upcoming exhibitions with professional installation and promotion.'
    },
    {
      icon: <RiTeamLine className="w-8 h-8 text-primary-600" />,
      title: 'Artist Community',
      description: 'Join our vibrant community of contemporary artists, curators, and art professionals.'
    },
    {
      icon: <RiAwardLine className="w-8 h-8 text-primary-600" />,
      title: 'Professional Development',
      description: 'Access to workshops, networking events, and opportunities to enhance your artistic career.'
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen pt-24">
      {/* Header Section - Teletext Style */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-6 text-[var(--color-primary)] inline-block border-b-4 border-[var(--color-primary)] pb-2">SUBMIT YOUR WORK</h1>
          <p className="text-xl max-w-2xl mx-auto text-[var(--color-primary)]">
            We are currently accepting submissions for our upcoming exhibitions and programs. Artists working in all media are encouraged to apply.
          </p>
        </div>
        
        {/* Main Content with Teletext Styling */}
        <div className="flex flex-col lg:flex-row gap-12 items-start max-w-6xl mx-auto">
          {/* Benefits Section */}
          <div className="w-full lg:w-1/3">
            <div className="teletext-box mb-8">
              <h2 className="text-2xl font-bold mb-6 border-b-2 border-[var(--color-primary)] pb-2 text-[var(--color-primary)]">BENEFITS</h2>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1 text-[var(--color-primary)]">{benefit.title}</h4>
                      <p className="text-gray-800">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="teletext-box">
              <h2 className="text-2xl font-bold mb-6 border-b-2 border-[var(--color-primary)] pb-2 text-[var(--color-primary)]">ABOUT OUR OPEN CALL</h2>
              <div className="prose prose-sm mb-6">
                <p className="mb-4 text-gray-800">
                  We welcome submissions from artists working in all mediums, including but not limited to painting, sculpture, photography, video, installation, and digital art.
                </p>
                
                <h3 className="text-lg font-bold mt-6 mb-2 text-[var(--color-primary)]">SELECTION PROCESS</h3>
                <p className="mb-4 text-gray-800">
                  All submissions are reviewed by our curatorial team. Selected artists will be contacted for further information and potential inclusion in upcoming exhibitions.
                </p>
                
                <h3 className="text-lg font-bold mt-6 mb-2 text-[var(--color-primary)]">DEADLINE</h3>
                <p className="mb-4 text-gray-800">
                  Submissions are accepted on a rolling basis, but for consideration in our upcoming season, please submit by December 31, 2023.
                </p>
              </div>
              
              <div className="mt-8 p-4 border-2 border-[var(--color-primary)]">
                <h3 className="text-lg font-bold mb-2 text-[var(--color-primary)]">QUESTIONS?</h3>
                <p className="text-gray-800 mb-3">
                  If you have any questions about the submission process, please contact us at:
                </p>
                <a 
                  href="mailto:opencall@garazas.art" 
                  className="text-[var(--color-primary)] hover:underline font-medium"
                >
                  opencall@garazas.art
                </a>
              </div>
            </div>
          </div>
          
          {/* Registration Form */}
          <div className="w-full lg:w-2/3 teletext-box">
            <h2 className="text-2xl font-bold mb-6 border-b-2 border-[var(--color-primary)] pb-2 text-[var(--color-primary)]">ARTIST REGISTRATION</h2>
            <p className="text-gray-800 mb-8">
              Please fill out the form below to submit your work for consideration. All fields marked with an asterisk (*) are required.
            </p>
            <ArtistRegistrationForm />
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-[var(--color-primary)] inline-block border-b-4 border-[var(--color-primary)] pb-2">FREQUENTLY ASKED QUESTIONS</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="teletext-box">
              <h3 className="text-xl font-bold mb-2 text-[var(--color-primary)]">WHAT TYPES OF WORK ARE YOU LOOKING FOR?</h3>
              <p className="text-gray-800">
                We're open to all contemporary art forms including but not limited to painting, sculpture, photography, video, installation, performance, and digital art. We're particularly interested in work that explores innovative approaches and contemporary themes.
              </p>
            </div>
            
            <div className="teletext-box">
              <h3 className="text-xl font-bold mb-2 text-[var(--color-primary)]">IS THERE AN APPLICATION FEE?</h3>
              <p className="text-gray-800">
                No, there is no fee to submit your work to our open call.
              </p>
            </div>
            
            <div className="teletext-box">
              <h3 className="text-xl font-bold mb-2 text-[var(--color-primary)]">HOW MANY WORK SAMPLES SHOULD I SUBMIT?</h3>
              <p className="text-gray-800">
                We recommend submitting 3-5 samples of your work that best represent your artistic practice. You can add more if necessary to provide a comprehensive understanding of your work.
              </p>
            </div>
            
            <div className="teletext-box">
              <h3 className="text-xl font-bold mb-2 text-[var(--color-primary)]">WHEN WILL I HEAR BACK ABOUT MY SUBMISSION?</h3>
              <p className="text-gray-800">
                Our curatorial team reviews submissions on a monthly basis. You can expect to hear back from us within 4-6 weeks of your submission. If your work is selected, we will contact you with further details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 