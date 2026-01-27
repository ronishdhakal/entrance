import Link from "next/link"
import Image from "next/image"
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Image
              src="/assets/logo.svg"
              alt="Entrance Prep by College Info Nepal Logo"
              width={140}
              height={32}
              className="brightness-0 invert"
            />
            <p className="text-sm text-white/80">
              Your trusted platform for entrance exam preparation. Practice with
              quality mock tests for BIT, BCA, BSc CSIT, and CMAT.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/collegeinfonepal"
                className="hover:text-white/70 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://x.com/CollegeNepal"
                className="hover:text-white/70 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://www.instagram.com/collegeinfonp/"
                className="hover:text-white/70 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.youtube.com/@collegeinfonepalvideos"
                className="hover:text-white/70 transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                ["Programs", "/#programs"],
                ["Features", "/#features"],
                ["News", "/news"],
                ["About Us", "/#about"],
                ["Dashboard", "/dashboard"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-semibold mb-4">Programs</h3>
            <ul className="space-y-2">
              {[
                ["BIT", "/program/bit"],
                ["BCA", "/program/bca"],
                ["BSc CSIT", "/program/bsc-csit"],
                ["CMAT", "/program/cmat"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span className="text-sm text-white/80">
                  Kathmandu, Nepal
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="flex-shrink-0" />
                <a
                  href="mailto:info@collegeinfonepal.com"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  info@collegeinfonepal.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="flex-shrink-0" />
                <a
                  href="tel:+977-9745450062"
                  className="text-sm text-white/80 hover:text-white transition-colors"
                >
                  +977-9745450062
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center md:flex md:justify-between md:items-center">
          <p className="text-sm text-white/70">
            © {currentYear} College Info Nepal Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
