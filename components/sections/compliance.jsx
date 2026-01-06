export function Compliance() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Secure, Compliant & Regulated
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12">
            Kambit operates with institutional-grade integrity. We maintain strict 
            adherence to global financial standards, including rigorous AML and KYC 
            protocols to ensure a safe trading environment for all our users.
          </p>

          {/* Compliance & Security Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">Data Protection</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your personal and financial data is protected by bank-grade AES-256 encryption.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">Asset Safety</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                We utilize multi-sig cold storage to ensure your digital assets remain offline and secure.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-indigo-600 dark:text-indigo-400 mb-2">Legal Compliance</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Operating in full alignment with Nigerian financial guidelines and global best practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}