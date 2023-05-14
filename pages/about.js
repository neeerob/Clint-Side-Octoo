import Image from 'next/image'
import { Inter } from 'next/font/google'
import MyLayout from './component/layout'
import Footer from './component/footer'

const inter = Inter({ subsets: ['latin'] })

export default function About() {
  return (
    <>
    <MyLayout title='About'/>

<section class="">
  <div class="container mx-auto px-6">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">About Octo-Shop</h1>
    <p class="text-gray-700 mb-8">Octo-Shop is an e-commerce website where sellers can sell their products and buyers can purchase them. Our platform is designed to provide a seamless shopping experience for everyone, with a wide range of products and secure payment options.</p>
    <div class="flex flex-wrap -mx-6">
      <div class="w-full lg:w-1/2 px-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p class="text-gray-700 mb-4">At Octo-Shop, we are dedicated to providing the best possible shopping experience for our customers. We believe that everyone should have access to quality products at affordable prices, and we strive to make this a reality.</p>
        <p class="text-gray-700 mb-4">We also believe in supporting our sellers by providing them with a platform to reach a wider audience and grow their businesses. By connecting buyers and sellers, we aim to create a community that benefits everyone.</p>
      </div>
      <div class="w-full lg:w-1/2 px-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-4">Our Team</h2>
        <p class="text-gray-700 mb-4">Our team at Octo-Shop is made up of passionate individuals who are committed to making online shopping easy and accessible for everyone. We are constantly working to improve our platform and provide the best possible experience for our customers and sellers.</p>
        <p class="text-gray-700 mb-4">If you have any questions or feedback, please don't hesitate to <a href="#" class="text-indigo-600 hover:text-indigo-800">contact us</a>. We'd love to hear from you!</p>
      </div>
    </div>
  </div>
</section>
    
    <Footer/>
    </>
  )
}
