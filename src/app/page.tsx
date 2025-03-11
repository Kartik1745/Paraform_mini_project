'use client';

import { use, useEffect, useState } from 'react';
import { Briefcase, Send, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

export default function Home() {

  const [notyf, setNotyf] = useState<Notyf | null>(null);

  useEffect(() => {
    setNotyf(new Notyf({
      duration: 3000,
      position: { x: 'center', y: 'top' },
      types: [
        {
          type: 'success',
          background: 'rgb(34 197 94)',
        },
        {
          type: 'error',
          background: 'rgb(239 68 68)',
        }
      ]
    }));
  }, []);


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    resume: null as File | null,
    coverLetter: '',
    currentCompany: '',
    currentTitle: '',
    websiteUrl: '',
    linkedinUrl: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, resume: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.resume) {
      setSubmitStatus('error');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          formDataToSend.append(key, value);
        }
      });

      const response = await fetch('/api/submit_application', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        notyf?.error('There was an error submitting your application. Please try again.')
      }
      else {
        notyf?.success('Application submitted successfully! We\'ll be in touch soon.');
      }
      
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        resume: null,
        coverLetter: '',
        currentCompany: '',
        currentTitle: '',
        websiteUrl: '',
        linkedinUrl: '',
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
            <Briefcase color="#000000" className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Senior Software Engineer</h1>
          <p className="text-lg text-gray-600">Join our team and help build the future of technology</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-8 mb-8">
          <div className="prose text-gray-900 max-w-none">
            <h2 className="text-2xl font-semibold mb-6">About this role</h2>
            <p className="mb-6">
              Recruiting is the highest-leverage action any company can take. Hundreds of billions are spent on staffing and recruiting per year because of how difficult yet critical it is. Hiring the best candidate for any role should take days, not months, and we believe we're best positioned to solve this at scale with our AI-enabled recruiting marketplace.
            </p>
            <p className="mb-8">
              Our customers come to us with a hunch—that the only way to build an engineering team of 8 with secret clearance in D.C. or find an AI safety engineer in London is to outsource their recruiting efforts. You'll be responsible for turning that hunch into reality by shipping with extreme urgency and having full ownership to craft a magical experience. We're fortunate to be both growing extremely fast and profitable. We've 10x-ed our revenue in the past year to seven figures in ARR with a small, close-knit team and have a clear plan to 10x again in 2025.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Why You Should Join</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>You want to own and shape how AI transforms recruiting.</li>
                  <li>You thrive in fast-paced, high-ownership environments.</li>
                  <li>You're excited to build with proprietary data and AI.</li>
                  <li>You want to help scale a company with a strong PMF while continuously innovating.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Why You Shouldn't Join</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>You prefer clear structure over fast-paced execution.</li>
                  <li>You want a 9-to-5 job with a predictable routine.</li>
                  <li>You need constant direction instead of owning problems.</li>
                  <li>You aren't passionate about fixing recruiting at scale.</li>
                  <li>You want a low-pressure role instead of rapid growth.</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">What You'll Work On</h3>
            <p className="mb-4">
              You'll work on high-impact, data-driven projects that optimize recruiter efficiency, improve hiring outcomes, and scale our platform across industries. Key challenges you'll tackle include:
            </p>
            <ul className="space-y-4 mb-8">
              <li>
                <strong>Intelligent Matching →</strong> Build systems to precisely match recruiters to roles and candidates to jobs, optimizing placements with real-time data and AI.
              </li>
              <li>
                <strong>Growth Engineering →</strong> Solve how we acquire every vertical—expanding Paraform's reach and impact while maintaining efficiency at scale.
              </li>
              <li>
                <strong>Leveraging Unique Data →</strong> Harness our proprietary recruiting data to continuously improve matching algorithms, recruiter efficiency, and company hiring processes.
              </li>
              <li>
                <strong>Upleveling Recruiters →</strong> Reduce time-to-value, optimize incentives, and build tools that make recruiters more effective from day one.
              </li>
              <li>
                <strong>Optimizing the Company Experience →</strong> Design a seamless, data-driven hiring process that makes recruiting on Paraform effortless and effective for companies.
              </li>
            </ul>
            <p className="mb-8">
              You'll have end-to-end ownership, the ability to ship fast, and the chance to work with one of the most valuable data sets in recruiting to solve hiring at scale.
            </p>

            <h3 className="text-xl font-semibold mb-4">What We Look For</h3>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>A product-minded engineer who cares deeply about customers and the core business.</li>
              <li>High attention to detail in design and user experience.</li>
              <li>2+ years of full-stack coding experience building products end-to-end.</li>
              <li>Experience working at early-stage startups or building/hacking products independently.</li>
              <li>Strong verbal and written communication skills.</li>
              <li>Thrives from working with a team and has immense drive and passion for the work you do.</li>
              <li>Prior experience in the talent and recruiting space.</li>
            </ul>
            <p className="text-gray-700 italic">This role has the potential to grow into our Head of Product.</p>
          </div>
        </div>

        <div className="border-t text-gray-900 pt-8">
              <h3 className="text-2xl font-semibold mb-4">Apply for this role</h3>
              <p className="text-gray-600 mb-4">Ready to join our team? Fill out the application form below to get started.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  required
                  className="w-full px-4 py-2 border rounded-lg border-gray-300 text-black"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  required
                  className="w-full px-4 py-2 border rounded-lg border-gray-300 text-black"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-2 border rounded-lg border-gray-300 text-black"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                required
                className="w-full px-4 py-2 border rounded-lg border-gray-300 text-black"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                placeholder="City, State, Country"
                className="w-full px-4 py-2 border rounded-lg border-gray-300 text-black"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="space-y-2">
                <label htmlFor="resume" className="text-sm font-medium text-gray-700">
                  Resume <span className="text-red-500">*</span>
                </label>
                <label
                  htmlFor="resume"
                  className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer"
                >
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      {formData.resume ? (
                        <span>Click to replace the file</span>
                      ) : (
                        <>
                          <span>Upload a file</span>
                          <p className="pl-1">or drag and drop</p>
                        </>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">PDF, DOC up to 10MB</p>
                </div>
                  <input
                    id="resume"
                    name="resume"
                    type="file"
                    required
                    className="sr-only"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                </label>
                {formData.resume && (
                  <p className="mt-2 text-sm text-gray-500">
                    Selected file: {formData.resume.name}
                  </p>
                )}
            </div>



            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Professional Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="currentCompany" className="text-sm font-medium text-gray-700">
                    Current Company
                  </label>
                  <input
                    type="text"
                    id="currentCompany"
                    className="w-full px-4 py-2 border rounded-lg border-gray-300 text-black"
                    value={formData.currentCompany}
                    onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="currentTitle" className="text-sm font-medium text-gray-700">
                    Current Title
                  </label>
                  <input
                    type="text"
                    id="currentTitle"
                    className="w-full px-4 py-2 border rounded-lg border-gray-300 text-black"
                    value={formData.currentTitle}
                    onChange={(e) => setFormData({ ...formData, currentTitle: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2">
                  <label htmlFor="websiteUrl" className="text-sm font-medium text-gray-700">
                    Personal Website URL
                  </label>
                  <input
                    type="url"
                    id="websiteUrl"
                    placeholder="https://"
                    className="w-full px-4 py-2 border rounded-lg border-gray-300 text-black"
                    value={formData.websiteUrl}
                    onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="linkedinUrl" className="text-sm font-medium text-gray-700">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    id="linkedinUrl"
                    placeholder="https://linkedin.com/in/"
                    className="w-full px-4 py-2 border rounded-lg border-gray-300 text-black"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-black border border-gray-300 bg-primary hover:bg-primary-dark hover:text-black focus:ring-2 focus:ring-primary"
            >
              {isSubmitting ? (
                'Submitting...'
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Submit Application
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}