import Image from 'next/image'
import { Inter } from 'next/font/google'
import MyLayout from './component/layout'
import Footer from './component/footer'
import Gallery from './component/gallery'
import Quot from './component/quot'
import Products from './component/products'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <div style={{ position: 'fixed', top: -10, width: '100%', zIndex: 1 }}>
    <MyLayout title='Home'/>
    </div>
    <div style={{marginTop: '105px'}}>
      <Gallery></Gallery>
    </div>

    <section class="bg-soft-white rounded-lg  dark:bg-gray-900 m-4  text-gray-600 body-font">
            <div>
                <Products/>
            </div>
    </section>
    


    <Quot></Quot>
    <Footer/>
    </>
  )
}
