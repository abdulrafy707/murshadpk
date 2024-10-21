// pages/faq.js
import React from 'react';
import Head from 'next/head';
import FaqSection from '../../components/FaqSection';

const FAQ = () => {
  return (
    <>
      <Head>
        <title>FAQ - murshadpk.com</title>
        <meta name="description" content="Frequently Asked Questions about murshadpk.com. Learn more about our services, policies, and how we can help you." />
      </Head>
      <div className="bg-gray-100 py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">Frequently Asked Questions</h1>
            <p className="mt-4 text-gray-600 text-sm md:text-base">Find answers to your questions about murshadpk.com</p>
          </div>
          <FaqSection />
          <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-lg mt-8 md:mt-12">
            <section className="mb-6 md:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">About murshadpk.com</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
                murshadpk.com is your one-stop online shopping destination. We offer a wide range of products at competitive prices, ensuring you find exactly what you're looking for. Our mission is to provide a seamless and enjoyable shopping experience, from browsing to delivery.
              </p>
            </section>
            <section className="mb-6 md:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Our Services</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
                At murshadpk.com, we pride ourselves on offering exceptional customer service. Our dedicated support team is available to assist you with any questions or concerns you may have. We also provide free shipping on orders over a certain amount, easy returns, and secure payment options.
              </p>
            </section>
            <section className="mb-6 md:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">
                If you need further assistance, please don't hesitate to reach out to us. You can contact our customer support team via email at <a href="pkmushad236@gmail.com" className="text-blue-500 hover:underline">pkmushad236@gmail.com</a> or by phone at <a href="tel:03356768338" className="text-blue-500 hover:underline">03356768338</a>. We're here to help!
              </p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
