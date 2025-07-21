import { useState } from "react";
import { Zap, Shield, BarChart3, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const features = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: "Fast",
      description: "Generate shortened URLs instantly",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Secure",
      description: "Advanced security for your links",
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Analytics",
      description: "Track clicks and performance",
    },
  ];

  const handleShortenBtn = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/signup");
    }, 1000);
  };

  return (
    <>
      {/* Home */}
      <section
        id="home"
        className="px-6 py-20 h-screen flex items-center justify-center"
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero section */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Shorten URLs.
            <br />
            <span className="text-gray-600">Track Everything.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Transform long URLs into short, memorable links with detailed
            analytics.
          </p>

          {/* URL Shortener Tool */}
          <div className="bg-orange-50  rounded-lg p-8 max-w-3xl mx-auto border border-orange-200">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <input
                  type="url"
                  placeholder="Enter your long URL here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-orange-200 rounded text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleShortenBtn}
                disabled={!input || loading}
                className="px-6 py-3 bg-orange-400 text-white rounded hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-orange-300 border-t-white rounded-full animate-spin"></div>
                    <span>Shortening...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4" />
                    <span>Shorten</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-6 py-20 bg-orange-50 ">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 100, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Features</h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage your URLs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                initial={{ opacity: 0, y: 300 }}
                whileInView={{ opacity: 100, y: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                viewport={{ once: true }}
                key={index}
                className="text-center p-6"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-400 text-white rounded-lg mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 100, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">About ShortLink</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're dedicated to making URL management simple, secure, and
              powerful for everyone.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 200 }}
            whileInView={{ opacity: 100, y: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">Our Mission</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At ShortLink, we believe that sharing links should be effortless
                and insightful. Our platform transforms lengthy URLs into clean,
                branded links while providing you with the analytics you need to
                understand your audience.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you're a marketer tracking campaign performance, a
                business owner sharing product links, or simply someone who
                wants cleaner URLs, we've got you covered.
              </p>
            </div>

            <div className="bg-orange-50 rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-6">Why Choose Us?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Reliable Infrastructure</h4>
                    <p className="text-gray-600 text-sm">
                      99.9% uptime guarantee with global CDN
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Advanced Analytics</h4>
                    <p className="text-gray-600 text-sm">
                      Real-time click tracking and user insights
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Custom Branding</h4>
                    <p className="text-gray-600 text-sm">
                      Use your own domain for branded links
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Enterprise Ready</h4>
                    <p className="text-gray-600 text-sm">
                      Team management and bulk operations
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 py-20 bg-orange-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <p className="text-gray-600">support@shortlink.com</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Phone</h4>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Address</h4>
                  <p className="text-gray-600">
                    123 Tech Street
                    <br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-8 border border-orange-200">
              <h3 className="text-2xl font-semibold mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 border border-orange-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 border border-orange-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows="4"
                    className="w-full px-4 py-3 border border-orange-200 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-orange-400 text-white rounded hover:bg-orange-500 transition-colors font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 bg-orange-400 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of users who trust ShortLink
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-orange-400 rounded hover:bg-orange-50 transition-colors flex items-center justify-center space-x-2 font-semibold">
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 border border-orange-300 hover:border-orange-100 rounded transition-colors font-semibold">
              View Pricing
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
