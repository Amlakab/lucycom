'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import { useTheme } from '@/lib/theme-context';
import { useLanguage } from '@/lib/language-context';
import { motion } from 'framer-motion';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { LucyBot } from '@/components/ui/LucyBot';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Eye,
  EyeOff,
  Lock,
  User,
  ShieldCheck,
  CheckCircle2,
  Server,
  Network
} from 'lucide-react';
import {
  FaNetworkWired,
  FaServer,
  FaShieldAlt,
  FaBuilding,
  FaCheckCircle,
  FaLock,
  FaKey,
  FaUserAlt
} from 'react-icons/fa';

export default function LoginPage() {
  const { theme } = useTheme();
  const { t, isAmharic } = useLanguage();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim() || !password.trim()) {
      const msg = isAmharic ? 'እባክዎ ኢሜይል ወይም ስልክ እና የይለፍ ቃል ያስገቡ' : 'Please enter your phone/email and password';
      setMessage(msg);
      toast.error(msg);
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const user = await login(identifier, password);
      if (user) {
        toast.success(
          isAmharic ? 'በተሳካ ሁኔታ ገብተዋል! እንኳን ደህና መጡ!' : 'Login successful! Welcome back!',
          { position: 'top-right', autoClose: 2000 }
        );
        router.push('/admin/portfolio');
      } else {
        const errorMsg = isAmharic ? 'መግባት አልተቻለም፡ የተጠቃሚ መረጃ አልተገኘም' : 'Invalid credentials. Please verify your phone/email and password.';
        setMessage(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message || (isAmharic ? 'መግባት አልተቻለም። እባክዎ መረጃዎን ያረጋግጡ' : 'Login failed. Please check your credentials');
      setMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      theme === 'dark' 
        ? 'bg-[#0a192f] text-gray-100' 
        : 'bg-[#F8FAFC] text-gray-900'
    }`}>
      <Navbar />
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme={theme === 'dark' ? 'dark' : 'light'}
      />

      <div className="container mx-auto px-4 py-8 pt-20 sm:pt-24 max-w-5xl">
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-xl sm:text-3xl font-extrabold mb-2 text-blue-600 dark:text-blue-400 tracking-tight">
            {isAmharic ? 'ወደ ሉሲኮም ፖርታል ይግቡ' : 'Sign In to Your Account'}
          </h1>
          <p className="text-xs sm:text-sm max-w-xl mx-auto text-gray-600 dark:text-gray-300">
            {isAmharic
              ? 'እንኳን ደህና መጡ! ወደ አስተዳዳሪ ወይም ደንበኛ ፖርታል ለመግባት መረጃዎን ያስገቡ።'
              : 'Welcome back! Please enter your authorized credentials to access your portal.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Form Card */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl border bg-white dark:bg-[#112240] border-gray-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                <FaLock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {isAmharic ? 'የመለያ መግቢያ' : 'Portal Sign In'}
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  LUCYCOM TECHNOLOGIES S.C.
                </p>
              </div>
            </div>

            {message && (
              <div className={`mb-5 p-3.5 rounded-xl text-xs sm:text-sm font-medium ${
                message.includes('success') || message.includes('ተሳክቷል')
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
              }`}>
                {message}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  {isAmharic ? 'የስልክ ቁጥር ወይም ኢሜይል' : 'Phone Number or Email'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <FaUserAlt className="text-xs" />
                  </div>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={isAmharic ? 'ስልክ ወይም ኢሜይል ያስገቡ' : 'Enter email or phone number'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  {isAmharic ? 'የይለፍ ቃል' : 'Password'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                    <FaKey className="text-xs" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-[#0a192f] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold rounded-xl shadow-md hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                {isLoading ? (
                  <span>{isAmharic ? 'በማረጋገጥ ላይ...' : 'Signing in...'}</span>
                ) : (
                  <span>{isAmharic ? 'ግባ' : 'Sign In'}</span>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-gray-100 dark:border-slate-800 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {isAmharic ? 'የመለያ ድጋፍ ይፈልጋሉ?' : 'Need technical support with your portal account?'}{' '}
                <Link href="/contact" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                  {isAmharic ? 'እኛን ያነጋግሩ' : 'Contact Support'}
                </Link>
              </p>
            </div>
          </div>

          {/* Right Column: Portal Info & Security */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#112240] border border-gray-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-blue-200 dark:border-blue-800 shadow-xs bg-white p-1">
                <Image
                  src="/logo.png"
                  alt="Lucycom Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-sm text-gray-900 dark:text-white">
                  LUCYCOM TECHNOLOGIES S.C.
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  {isAmharic ? 'ደህንነቱ የተጠበቀ ኢንተርፕራይዝ ፖርታል' : 'Secure Enterprise Portal'}
                </p>
              </div>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-start gap-2.5">
                <FaCheckCircle className="text-blue-500 shrink-0 mt-0.5" />
                <span>{isAmharic ? 'የቴሌኮም እና የኔትወርክ ሳይቶች የክትትል ዳሽቦርድ' : 'Real-time telemetry and site rollout progress monitoring'}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <FaCheckCircle className="text-blue-500 shrink-0 mt-0.5" />
                <span>{isAmharic ? 'የዳታ ሴንተር SLA እና የጥገና ሪፖርቶች' : 'Data center facility SLA management and preventative reports'}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <FaCheckCircle className="text-blue-500 shrink-0 mt-0.5" />
                <span>{isAmharic ? 'የጨረታ እና የፕሮጀክት ሰነዶች አስተዳደር' : 'Encrypted tender documents, BOQ estimates, and warranties'}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 text-xs text-gray-700 dark:text-gray-300 space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400 block">
                {isAmharic ? '256-ቢት ምስጠራ' : 'Zero-Trust 256-bit Encryption'}
              </span>
              <p>
                {isAmharic
                  ? 'የእርስዎ ውሂብ በደህንነት የተጠበቀ ነው። ያለፈቃድ መግባት በህግ የተከለከለ ነው።'
                  : 'Authorized personnel only. All access is logged, audited, and protected.'}
              </p>
            </div>
          </div>

        </div>
      </div>

      <LucyBot />
      <Footer />
    </div>
  );
}
