import { Link } from 'react-router-dom';
import { Zap, Github, Linkedin, Mail } from 'lucide-react';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Journey', to: '/journey' },
  { label: 'Timeline', to: '/timeline' },
  { label: 'Eligibility', to: '/eligibility' },
  { label: 'Ask AI', to: '/chat' },
];

const techStack = ['React', 'Node.js', 'Express.js', 'Gemini API', 'Tailwind CSS'];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Top CTA Block */}
      <div className="bg-green-50/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Your vote. Your voice. Your future.
          </p>
          <p className="text-gray-500 text-lg">
            Be informed. Be confident. Be a part of democracy.
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="bg-green-50 p-1.5 rounded-lg">
                <Zap size={20} className="text-green-600" />
              </div>
              <span className="text-lg font-bold text-gray-900">
                VotePath <span className="text-green-600">AI</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Built to simplify voting awareness using official Election Commission data for every Indian.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/omkorade"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-social-github"
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/in/om-korade"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-social-linkedin"
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:omkorade2006@gmail.com"
                id="footer-social-mail"
                className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-600 transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Tech Stack */}
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

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Contact Developer
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-500">
                <span className="font-medium text-gray-700 flex-shrink-0">Name:</span>
                Om Korade
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-500 break-all">
                <span className="font-medium text-gray-700 flex-shrink-0">Email:</span>
                <a
                  href="mailto:omkorade2006@gmail.com"
                  className="hover:text-green-600 transition-colors"
                >
                  omkorade2006@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-500">
                <span className="font-medium text-gray-700 flex-shrink-0">GitHub:</span>
                <a
                  href="https://github.com/omkorade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-600 transition-colors"
                >
                  github.com/omkorade
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-500">
                <span className="font-medium text-gray-700 flex-shrink-0">LinkedIn:</span>
                <a
                  href="https://linkedin.com/in/om-korade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-green-600 transition-colors"
                >
                  linkedin.com/in/om-korade
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            © 2025 VotePath AI. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Made with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
}
