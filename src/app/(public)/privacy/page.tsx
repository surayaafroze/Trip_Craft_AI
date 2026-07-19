"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="bg-background min-h-screen py-20">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 max-w-4xl"
      >
        <div className="bg-white rounded-3xl premium-shadow border border-gray-100 p-8 md:p-12">
          <h1 className="text-4xl font-extrabold text-foreground mb-8 tracking-tight">Privacy Policy</h1>
          
          <div className="space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                At TripCraft AI, we collect information you provide directly to us when you create an account, build an itinerary, or contact us for support. This may include your name, email address, and any travel preferences you share.
              </p>
              <p>
                When you use Google Authentication, we receive basic profile information like your name and email to create your account seamlessly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our AI itinerary generation services</li>
                <li>Create and secure your user account</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Analyze usage patterns to improve the user experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Security</h2>
              <p>
                We implement robust security measures to protect your personal information. Your passwords are encrypted, and we use secure communication protocols (HTTPS) to transmit your data. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Services</h2>
              <p>
                We use third-party services like Google for authentication and AI models (like Google Gemini) for generating itineraries. These services have their own privacy policies. We do not sell your personal data to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights</h2>
              <p>
                You have the right to access, update, or delete your personal information at any time. You can do this through your account settings or by contacting our support team.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at support@tripcraft.ai.
              </p>
            </section>
            
            <p className="text-sm text-gray-400 mt-12 pt-8 border-t border-gray-100">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
