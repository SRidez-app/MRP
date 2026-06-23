"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Shield, FileText, Calendar } from 'lucide-react';

const ClientPortal = () => {
  const portalUrl = "https://www7.nowcerts.com/Login.aspx?AgencyId=9f838b40-7a33-4852-a129-7375ca8d7936&ShowAgencyLogo=true";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#CC9F54] to-[#B8893D] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Client Portal</h1>
            <p className="text-xl">Access your insurance policies and documents</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-[#CC9F54] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Login Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Sign In to Your Account
            </h2>
            <p className="text-gray-600">
              Access your policies, documents, and manage your insurance needs
            </p>
          </div>

          {/* Portal Access Button */}
          <div className="text-center py-8">
            <div className="mb-6">
              <Shield className="h-16 w-16 text-[#CC9F54] mx-auto mb-4" />
              <p className="text-gray-600 mb-6">
                Click below to securely access your client portal
              </p>
            </div>
            
            <a 
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#CC9F54] hover:bg-[#B8893D] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Access Client Portal
              <ExternalLink className="ml-2 h-5 w-5" />
            </a>
            
            <p className="text-sm text-gray-500 mt-4">
              You will be redirected to our secure portal
            </p>
          </div>

          {/* Security Note */}
          <div className="mt-8 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-gray-600">
                <p className="font-semibold text-gray-700 mb-1">Secure Connection</p>
                <p>Your login information is protected with industry-standard encryption. You'll be directed to our secure NowCerts portal.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-[#FBF5EB] rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Need Help?
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <span className="text-[#CC9F54] mr-2">•</span>
              <span>Forgot your password? Use the "Forgot Password" link on the login page</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#CC9F54] mr-2">•</span>
              <span>First time user? Contact us to set up your account</span>
            </li>
            <li className="flex items-start">
              <span className="text-[#CC9F54] mr-2">•</span>
              <span>Having trouble logging in? Call us at (555) 123-4567</span>
            </li>
          </ul>
        </div>

        {/* Features Section */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            What You Can Do in the Portal
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-[#FBF5EB] rounded-full p-3 w-12 h-12 mb-4 flex items-center justify-center">
                <FileText className="h-6 w-6 text-[#CC9F54]" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">View Policies</h4>
              <p className="text-gray-600 text-sm">Access all your insurance policies and coverage details in one place</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-[#FBF5EB] rounded-full p-3 w-12 h-12 mb-4 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#CC9F54]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Download Documents</h4>
              <p className="text-gray-600 text-sm">Get certificates and important documents when you need them</p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-[#FBF5EB] rounded-full p-3 w-12 h-12 mb-4 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-[#CC9F54]" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Manage Renewals</h4>
              <p className="text-gray-600 text-sm">Stay on top of policy renewals and important dates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;