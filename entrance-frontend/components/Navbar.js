"use client";

import Head from "next/head";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { isAuthenticated, getCurrentUser, logout } from "@/lib/auth";
import { useRouter } from "next/navigation";
import FeaturedAds from "@/components/ads/FeaturedAds";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const loggedIn = isAuthenticated();
      setIsLoggedIn(loggedIn);

      if (loggedIn) {
        const userData = await getCurrentUser();
        setUser(userData);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUser(null);
    router.push("/login");
  };

  return (
    <>
      {/* ===== HEAD ===== */}
      <Head>
        <title>Entrance Prep by College Info Nepal</title>

        <meta
          name="description"
          content="Prepare for BSc CSIT, BIT, BBA and other entrance exams with mock tests, practice questions, real exam patterns, and smart preparation tools by College Info Nepal."
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* ✅ Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content="In_u6RGEpUbj3PhoaLjXNsloEjIUZ2cXTcYqfLi_iYU"
        />
      </Head>

      {/* ===== GOOGLE ANALYTICS ===== */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-3H8YGYXHPP"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3H8YGYXHPP');
        `}
      </Script>

      {/* ===== NAVBAR ===== */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/logo.svg"
                alt="Entrance Prep by College Info Nepal"
                width={140}
                height={32}
                priority
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/#programs" className="text-gray-700 hover:text-primary">
                Mock Tests
              </Link>
              <Link href="/exam" className="text-gray-700 hover:text-primary">
                Entrance
              </Link>
              <Link href="/book" className="text-gray-700 hover:text-primary">
                Books
              </Link>
              <Link href="/college" className="text-gray-700 hover:text-primary">
                Colleges
              </Link>
              {/* <Link href="/#about" className="text-gray-700 hover:text-primary">
                About
              </Link> */}

              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="text-gray-700 hover:text-primary">
                    Dashboard
                  </Link>

                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-2 text-gray-700">
                      <User size={18} />
                      {user?.full_name}
                    </span>

                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1 text-red-600 hover:text-red-700"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-700 hover:text-primary">
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-primary text-white px-5 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <Link href="/#programs" onClick={() => setIsMenuOpen(false)}>
                  Mock Tests
                </Link>
                <Link href="/exam" onClick={() => setIsMenuOpen(false)}>
                  Entrance
                </Link>
                <Link href="/book" onClick={() => setIsMenuOpen(false)}>
                  Books
                </Link>
                <Link href="/college" onClick={() => setIsMenuOpen(false)}>
                  Colleges
                </Link>
                {/* <Link href="/#features" onClick={() => setIsMenuOpen(false)}>
                  Features
                </Link> */}
                {/* <Link href="/#about" onClick={() => setIsMenuOpen(false)}>
                  About
                </Link> */}

                {isLoggedIn ? (
                  <>
                    <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                      Dashboard
                    </Link>

                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-600 mb-2">
                        Logged in as {user?.full_name}
                      </p>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-2 text-red-600"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="bg-primary text-white px-5 py-2 rounded-lg text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ===== FEATURED ADS ===== */}
      <FeaturedAds />
    </>
  );
}
