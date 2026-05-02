import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Globe,
  Bot,
  Shield,
  CheckCircle,
  ArrowRight,
  Vote,
  Building2,
  Users,
  ChevronDown,
  MapPin,
  ClipboardList,
} from 'lucide-react';
import Footer from '../components/Footer.jsx';

const faqs = [
  {
    q: 'Can I vote without voter ID?',
    a: 'Yes. The ECI accepts 12 alternate photo IDs including Aadhaar Card, PAN Card, Driving Licence, and Passport.',
  },
  {
    q: 'How do I register as a new voter?',
    a: 'Fill Form 6 online at voters.eci.gov.in. You need age proof, address proof, and a photograph.',
  },
  {
    q: 'Is the information on VotePath AI official?',
    a: "All content is sourced from the Election Commission of India's official guidelines and verified FAQs.",
  },
  {
    q: 'What documents are required to vote?',
    a: 'Voter ID (EPIC) or any of 12 ECI-approved alternate photo IDs. You only need one document.',
  },
  {
    q: 'What is the minimum age to vote?',
    a: 'You must be 18 years old on the qualifying date. India now has 4 qualifying dates per year.',
  },
  {
    q: 'Where can I find my polling booth?',
    a: 'Search at electoralsearch.eci.gov.in using your EPIC number or name and date of birth.',
  },
];

const features = [
  {
    icon: Zap,
    color: 'bg-yellow-50 text-yellow-600',
    title: 'Learn in 60 Seconds',
    desc: 'Bite-sized, plain-language explanations covering every stage of the Indian election process.',
  },
  {
    icon: Globe,
    color: 'bg-blue-50 text-blue-600',
    title: 'Made for Every Indian',
    desc: "Available in English, Hindi, Tamil, and Marathi — built for India's 1.4 billion citizens.",
  },
  {
    icon: Bot,
    color: 'bg-purple-50 text-purple-600',
    title: 'AI-Powered Answers',
    desc: 'Ask any election question in plain language and receive an instant, grounded answer.',
  },
  {
    icon: Shield,
    color: 'bg-green-50 text-green-600',
    title: 'Verified & Reliable',
    desc: 'Every answer is grounded in official Election Commission of India data — no guesswork.',
  },
];

const doCards = [
  {
    to: '/journey',
    bg: 'bg-green-50',
    iconColor: 'text-green-600',
    Icon: ClipboardList,
    title: 'Step-by-Step Journey',
    desc: 'Understand the entire voting process in simple, guided steps.',
  },
  {
    to: '/eligibility',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    Icon: CheckCircle,
    title: 'Check Your Eligibility',
    desc: 'Find out if you meet the requirements to vote in India.',
  },
  {
    to: '/timeline',
    bg: 'bg-orange-50',
    iconColor: 'text-orange-500',
    Icon: MapPin,
    title: 'Explore Timeline',
    desc: 'Understand every phase of an Indian election from announcement to results.',
  },
  {
    to: '/chat',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    Icon: Bot,
    title: 'Ask AI Assistant',
    desc: 'Get instant, reliable answers to any election-related question.',
  },
];

function FaqItem({ faq, index, openIndex, setOpenIndex }) {
  const isOpen = openIndex === index;
  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-6 cursor-pointer select-none hover:border-green-200 transition-colors"
      onClick={() => setOpenIndex(isOpen ? null : index)}
      id={`faq-item-${index}`}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-gray-900">{faq.q}</p>
        <ChevronDown
          size={18}
          className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>
      {isOpen && (
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">{faq.a}</p>
      )}
    </div>
  );
}

function JourneyMockup() {
  const steps = [
    { n: 1, label: 'Step 1 of 6', title: 'Check Eligibility', desc: 'Confirm your age and citizenship.' },
    { n: 2, label: 'Step 2 of 6', title: 'Register to Vote', desc: 'Fill Form 6 at voters.eci.gov.in.' },
    { n: 3, label: 'Step 3 of 6', title: 'Verify Your Name', desc: 'Confirm your name is on the roll.' },
  ];
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Journey Overview</p>
      <div className="relative">
        <div className="absolute left-3.5 top-0 bottom-0 w-px bg-gray-200" />
        {steps.map((s) => (
          <div key={s.n} className="flex gap-4 mb-4 last:mb-0 relative">
            <div className="w-7 h-7 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 z-10">
              {s.n}
            </div>
            <div>
              <p className="text-xs text-gray-400">{s.label}</p>
              <p className="text-sm font-semibold text-gray-900">{s.title}</p>
              <p className="text-xs text-gray-500">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 w-full bg-green-600 text-white text-xs font-semibold py-2 rounded-lg text-center">
        Continue
      </div>
    </div>
  );
}

function TimelineMockup() {
  const phases = [
    'Election Notification',
    'Nominations',
    'Scrutiny',
    'Withdrawal',
    'Voting Day',
    'Counting & Results',
  ];
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Election Timeline</p>
      <div className="space-y-2">
        {phases.map((phase, i) => (
          <div
            key={phase}
            className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-400 w-4">{i + 1}</span>
              <span className="text-xs font-medium text-gray-700">{phase}</span>
            </div>
            <ChevronDown size={12} className="text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatMockup() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">AI Assistant</p>
      <div className="space-y-3">
        <div className="flex justify-end">
          <div className="bg-green-600 text-white text-xs rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%]">
            Can I vote without voter ID?
          </div>
        </div>
        <div className="flex justify-start">
          <div className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-2xl rounded-tl-sm px-4 py-2 max-w-[90%]">
            Yes, you can vote using any of 12 ECI-approved IDs: Aadhaar, PAN Card, Passport, Driving Licence, or other approved documents.
            <p className="text-gray-400 text-xs mt-1 pt-1 border-t border-gray-100">source: eci.gov.in</p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <div className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-xs text-gray-400">
          Type your question...
        </div>
        <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center">
          <ArrowRight size={12} className="text-white" />
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div>
      {/* ── 1. HERO ── */}
      <section id="section-hero" className="bg-white py-20 md:py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 text-xs font-semibold px-4 py-2 rounded-full mb-6">
                <CheckCircle size={13} />
                Trusted. Verified. Built on official ECI data.
              </div>

              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-5">
                Understand Elections.{' '}
                <span className="text-green-600">Vote with</span>{' '}
                Confidence.
              </h1>

              <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                A simple, guided platform to help every Indian citizen navigate the election process
                — from eligibility to casting your vote.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Link
                  to="/journey"
                  id="hero-cta-journey"
                  className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Start Exploring
                  <ArrowRight size={17} />
                </Link>
                <Link
                  to="/eligibility"
                  id="hero-cta-eligibility"
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 font-semibold px-7 py-3.5 rounded-full hover:bg-gray-50 transition-all duration-200"
                >
                  <Users size={16} />
                  Check Eligibility
                </Link>
              </div>

              <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-green-500" />
                  100% Free
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-green-500" />
                  No Sign-up Required
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-green-500" />
                  Built using official ECI data
                </span>
              </div>
            </div>

            {/* Right: Decorative Illustration */}
            <div className="relative flex items-center justify-center h-80 lg:h-96">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 rounded-full bg-green-50 opacity-60" />
              </div>
              <div className="absolute top-4 right-8 w-16 h-16 rounded-full bg-orange-50 opacity-80" />
              <div className="absolute bottom-8 left-8 w-12 h-12 rounded-full bg-blue-50 opacity-80" />
              <div className="absolute top-12 left-16 w-8 h-8 rounded-full bg-yellow-50" />

              <div className="relative z-10 flex flex-col gap-4 items-center">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 flex flex-col items-center gap-3">
                  <div className="w-20 h-20 rounded-2xl bg-green-50 flex items-center justify-center">
                    <Vote size={40} className="text-green-600" />
                  </div>
                  <p className="text-sm font-bold text-gray-900">Your Vote Matters</p>
                  <p className="text-xs text-gray-500">Every vote counts in a democracy</p>
                </div>

                <div className="flex gap-4">
                  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Building2 size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900">ECI Verified</p>
                      <p className="text-xs text-gray-400">Official data</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                      <Users size={20} className="text-orange-500" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-900">968M+ Voters</p>
                      <p className="text-xs text-gray-400">Registered</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FEATURES STRIP ── */}
      <section id="section-features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 hover:shadow-md transition-all duration-300"
              >
                <div className={`inline-flex p-3 rounded-full mb-4 ${f.color}`}>
                  <f.icon size={22} />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. WHAT YOU CAN DO HERE — id="explore" for Navbar ── */}
      <section id="explore" className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              What you can do here
            </h2>
            <div className="flex justify-center">
              <div className="h-1 w-16 bg-green-500 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {doCards.map((card) => (
              <div
                key={card.to}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
              >
                <div className={`h-40 ${card.bg} flex items-center justify-center`}>
                  <card.Icon size={52} className={card.iconColor} strokeWidth={1.5} />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-1">{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{card.desc}</p>
                  <div className="flex justify-end mt-4">
                    <Link
                      to={card.to}
                      id={`do-card-link-${card.to.replace('/', '')}`}
                      className="flex items-center gap-1 text-green-600 text-sm font-semibold hover:gap-2 transition-all"
                    >
                      Explore <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. APP PREVIEW — id="how-it-works" for Navbar ── */}
      <section id="how-it-works" className="bg-slate-50 py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              See VotePath AI in action
            </h2>
            <div className="flex justify-center">
              <div className="h-1 w-16 bg-green-500 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <JourneyMockup />
            <TimelineMockup />
            <ChatMockup />
          </div>
        </div>
      </section>

      {/* ── 5. FAQ ── */}
      <section id="faqs" className="bg-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <div className="flex justify-center">
              <div className="h-1 w-16 bg-green-500 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                faq={faq}
                index={i}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER — id="contact" for Navbar ── */}
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
}
