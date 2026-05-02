import { Link } from 'react-router-dom';
import { Zap, Linkedin, Github, Mail } from 'lucide-react';

const techStack = ['React', 'Node.js', 'Express.js', 'Gemini API', 'Tailwind CSS'];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      {/* ── Tagline Block ── */}
      <div className="bg-green-50/50 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Your vote. Your voice. Your future.
          </p>
          <p className="text-gray-500 text-lg">
            Be informed. Be confident. Be a part of democracy.
          </p>
        </div>
      </div>

      {/* ── Main Footer Columns ── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex justify-between items-start gap-8">

          {/* LEFT: Brand — left aligned */}
          <div className="flex-1">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="bg-green-50 p-1.5 rounded-lg">
                <Zap size={20} className="text-green-600" />
              </div>
              <span className="text-lg font-bold text-gray-900">
                VotePath <span className="text-green-600">AI</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Built to simplify voting awareness using official Election Commission data for every Indian.
            </p>
          </div>

          {/* CENTER: Tech Stack — block centered, content left aligned */}
          <div className="flex-1 flex justify-center">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Tech Stack
              </h3>
              <ul className="space-y-2">
                {techStack.map((tech) => (
                  <li key={tech} className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* RIGHT: About Developer — block on right, content left aligned */}
          <div className="flex-1 flex justify-end">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                About Developer
              </h3>
              <p className="text-sm font-semibold text-gray-800 mb-3">Om Korade</p>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href="https://www.linkedin.com/in/om-korade-475279398/"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="footer-linkedin"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin size={15} className="text-blue-500 flex-shrink-0" />
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/omkorade23"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="footer-github"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <Github size={15} className="text-gray-600 flex-shrink-0" />
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:omkorade23@gmail.com"
                    id="footer-email"
                    className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 transition-colors"
                  >
                    <Mail size={15} className="text-green-500 flex-shrink-0" />
                    omkorade23@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">© 2025 VotePath AI. All rights reserved.</p>
          <a
            href="https://github.com/omkorade23/VoteGuide-AI"
            target="_blank"
            rel="noopener noreferrer"
            id="footer-repo-link"
            className="text-xs text-green-600 hover:text-green-700 font-medium underline underline-offset-2 transition-colors"
          >
            GitHub Repo
          </a>
        </div>
      </div>
    </footer>
  );
}
