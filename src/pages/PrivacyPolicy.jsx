const PrivacyPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="mb-12">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Legal</p>
        <h1 className="text-3xl font-medium text-gray-900 mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-400">Last updated: March 2025</p>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-10 text-gray-600 text-sm leading-relaxed">

        <section>
          <h2 className="text-base font-medium text-gray-900 mb-3">1. Introduction</h2>
          <p>
            At Velora, your privacy is important to us. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your personal information when you visit our website or make a purchase.
            By using our platform, you consent to the practices described in this policy.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-900 mb-3">2. Information We Collect</h2>
          <p className="mb-3">We may collect the following types of information:</p>
          <ul className="list-disc list-inside flex flex-col gap-2 text-gray-500">
            <li>Personal details such as your name, email address, and phone number</li>
            <li>Billing and shipping address for order fulfillment</li>
            <li>Payment information (processed securely — we do not store card details)</li>
            <li>Browsing behavior and preferences on our platform</li>
            <li>Device information such as IP address, browser type, and operating system</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-900 mb-3">3. How We Use Your Information</h2>
          <p className="mb-3">The information we collect is used to:</p>
          <ul className="list-disc list-inside flex flex-col gap-2 text-gray-500">
            <li>Process and fulfill your orders accurately and on time</li>
            <li>Communicate with you about your orders, promotions, and updates</li>
            <li>Improve our platform, products, and customer experience</li>
            <li>Detect and prevent fraudulent or unauthorized activity</li>
            <li>Comply with legal obligations and enforce our policies</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-900 mb-3">4. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your browsing experience, analyze
            platform traffic, and personalize content. You can control cookie settings through your browser
            preferences. Disabling cookies may affect some features of the platform.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-900 mb-3">5. Sharing Your Information</h2>
          <p className="mb-3">
            We do not sell or rent your personal information to third parties. We may share your data with:
          </p>
          <ul className="list-disc list-inside flex flex-col gap-2 text-gray-500">
            <li>Trusted service providers who assist in operating our platform and processing orders</li>
            <li>Payment processors to securely handle transactions</li>
            <li>Law enforcement or legal authorities when required by law</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-900 mb-3">6. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your personal information from
            unauthorized access, disclosure, or destruction. However, no method of transmission over the
            internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-900 mb-3">7. Your Rights</h2>
          <p className="mb-3">You have the right to:</p>
          <ul className="list-disc list-inside flex flex-col gap-2 text-gray-500">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate or incomplete data</li>
            <li>Request deletion of your personal data where applicable</li>
            <li>Opt out of marketing communications at any time</li>
            <li>Lodge a complaint with a relevant data protection authority</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-900 mb-3">8. Third-Party Links</h2>
          <p>
            Our platform may contain links to third-party websites. We are not responsible for the privacy
            practices or content of those sites. We encourage you to review their privacy policies before
            providing any personal information.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-900 mb-3">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page
            with an updated revision date. We encourage you to review this policy periodically to stay
            informed about how we protect your information.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-900 mb-3">10. Contact Us</h2>
          <p>
            For any privacy-related questions or requests, please reach out to us at{' '}
            <a href="mailto:khaledwaleed123b@gmail.com" className="text-gray-900 underline underline-offset-2">
              khaledwaleed123b@gmail.com
            </a>
            {' '}or call us at{' '}
            <a href="tel:+201015555555" className="text-gray-900 underline underline-offset-2">
              +20 101 555 5555
            </a>.
          </p>
        </section>

      </div>
    </div>
  )
}

export default PrivacyPolicy