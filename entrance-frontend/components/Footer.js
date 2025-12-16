import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Image src="/assets/logo.svg" alt="MockTest Logo" width={140} height={32} className="brightness-0 invert" />
            <p className="text-sm text-gray-400">
              Your trusted platform for entrance exam preparation. Practice with quality mock tests for BIT, BCA, BSc
              CSIT, and CMAT.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/collegeinfonepal" className="hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://x.com/CollegeNepal" className="hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/collegeinfonp/" className="hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@collegeinfonepalvideos" className="hover:text-primary transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#programs" className="text-sm hover:text-primary transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="/#features" className="text-sm hover:text-primary transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-sm hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-sm hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-white font-semibold mb-4">Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/program/bit" className="text-sm hover:text-primary transition-colors">
                  BIT
                </Link>
              </li>
              <li>
                <Link href="/program/bca" className="text-sm hover:text-primary transition-colors">
                  BCA
                </Link>
              </li>
              <li>
                <Link href="/program/csit" className="text-sm hover:text-primary transition-colors">
                  BSc CSIT
                </Link>
              </li>
              <li>
                <Link href="/program/cmat" className="text-sm hover:text-primary transition-colors">
                  CMAT
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="mt-0.5 flex-shrink-0" />
                <span className="text-sm">Kathmandu, Nepal</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="flex-shrink-0" />
                <a href="mailto:info@collegeinfonepal.com" className="text-sm hover:text-primary transition-colors">
                  info@collegeinfonepal.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="flex-shrink-0" />
                <a href="tel:+977-9745450062" className="text-sm hover:text-primary transition-colors">
                  +977-9745450062
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center md:flex md:justify-between md:items-center">
          <p className="text-sm text-gray-400">© {currentYear} College Info Nepal Pvt. Ltd. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-gray-400 hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
