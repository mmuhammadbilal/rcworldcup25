import React from "react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="min-h-[40px]">
  {/* Optional content */}
</div>

        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">Get in Touch</h1>
        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          We'd love to hear from you! Whether it's a question, feedback, or a business inquiry — our team is here for you.
        </p>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-2xl transition">
            <h3 className="text-lg font-semibold mb-2">📞 Phone</h3>
            <p className="text-gray-300">+92 3155667832</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-2xl transition">
            <h3 className="text-lg font-semibold mb-2">📧 Email</h3>
            <p className="text-gray-300">Bilalshaid@gmail.com</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-2xl transition">
            <h3 className="text-lg font-semibold mb-2">📍 Location</h3>
            <p className="text-gray-300">Islamabad, Pakistan</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-800 rounded-xl p-8 shadow-lg max-w-3xl mx-auto">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Your Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                rows="5"
                required
                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition duration-300"
            >
              Send Message 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
