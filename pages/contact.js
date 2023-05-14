import Image from 'next/image'
import { Inter } from 'next/font/google'
import MyLayout from './component/layout'
import Footer from './component/footer'

const inter = Inter({ subsets: ['latin'] })

export default function Contact() {
  return (
    <>
    <MyLayout title='Contact'/>
    
    
    <section class="text-center">
  <div class="container mx-auto px-6">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
    <p class="text-gray-700 mb-8">Have a question or feedback? We'd love to hear from you!</p>
    <form class="w-full max-w-lg mx-auto">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3 mb-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
            Name
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-name" type="text" placeholder="John Doe"/>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
            Email
          </label>
          <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-email" type="email" placeholder="johndoe@example.com"/>
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-message">
            Message
          </label>
          <textarea class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-message" rows="5" placeholder="Enter your message here"></textarea>
        </div>
      </div>
      <div class="md:flex md:items-center">
      <div class="flex justify-center">
          <button class="shadow bg-indigo-600 hover:bg-indigo-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
            Send
          </button>
        </div>
        <div class="md:w-2/3"></div>
      </div>
    </form>
  </div>
</section>



    <Footer/>
    </>
  )
}
