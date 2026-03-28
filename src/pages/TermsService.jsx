const TermsOfService = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="mb-12">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">Legal</p>
        <h1 className="text-3xl font-medium text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-sm text-gray-400">Last updated: March 2025</p>
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-10 text-gray-600 text-sm leading-relaxed">

        <section>
          <h2 className="text-base font-medium text-gray-900 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Velora's website and services, you agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use our services. We reserve the right to update
            these terms at any time, and your continued use of the platform constitutes acceptance of any changes.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-900 mb-3">2. Use of the Platform</h2>
          <p className="mb-3">
            Velora grants you a limited, non-exclusive, non-transferable license to access and use the platform
            for personal, non-commercial purposes. You agree not to:
          </p>
          <ul className="list-disc list-inside flex flex-col gap-2 text-gray-500">
            <li>Use the platform for any unlawful purpose or in violation of any regulations</li>
            <li>Attempt to gain unauthorized access to any part of the platform</li>
            <li>Reproduce, duplicate, or resell any part of our services without permission</li>
            <li>Upload or transmit any harmful, offensive, or disruptive content</li>
            <li>Interfere with the security or integrity of the platform</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-900 mb-3">3. Account Responsibility</h2>
          <p>
            You are responsible for maintaining the confidentiality of your account credentials and for all
            activities that occur under your account. You agree to notify us immediately of any unauthorized
            use of your account. Velora will not be liable for any loss resulting from unauthorized use of
            your account.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-900 mb-3">4. Orders & Payments</h2>
          <p className="mb-3">
            All orders placed through Velora are subject to acceptance and availability. We reserve the right
            to refuse or cancel any order at our discretion. Prices are listed in USD and are subject to change
            without notice. By placing an order, you confirm that:
          </p>
          <ul className="list-disc list-inside flex flex-col gap-2 text-gray-500">
            <li>All payment information provided is accurate and complete</li>
            <li>You are authorized to use the payment method provided</li>
            <li>You agree to pay the total amount including applicable taxes and shipping fees</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-900 mb-3">5. Returns & Refunds</h2>
          <p>
            Items may be returned within 30 days of delivery in their original condition. To initiate a return,
            contact our support team. Refunds will be processed within 5–10 business days to the original
            payment method. Velora reserves the right to reject returns that do not meet our return policy
            requirements.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-900 mb-3">6. Intellectual Property</h2>
          <p>
            All content on this platform — including logos, text, images, and design — is the property of
            Velora and is protected by applicable intellectual property laws. You may not use, copy, or
            distribute any content without our prior written consent.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-900 mb-3">7. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Velora shall not be liable for any indirect, incidental,
            special, or consequential damages arising from your use of our platform or services. Our total
            liability shall not exceed the amount paid by you for the specific order in question.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-900 mb-3">8. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of Egypt. Any disputes
            arising from these terms shall be subject to the exclusive jurisdiction of the courts located in
            Cairo, Egypt.
          </p>
        </section>

        <section>
          <h2 className="text-base font-medium text-gray-900 mb-3">9. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at{' '}
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

export default TermsOfService