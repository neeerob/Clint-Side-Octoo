import { useEffect } from 'react';

export default function Gallery(){
    useEffect(() => {
        if (typeof document !== 'undefined') {
          const prevButton = document.querySelector('[data-carousel-prev]');
          const nextButton = document.querySelector('[data-carousel-next]');
          const items = document.querySelectorAll('[data-carousel-item]');
    
          let currentIndex = 0;
    
          function updateCarousel() {
            items.forEach((item, index) => {
              if (index === currentIndex) {
                item.setAttribute('data-carousel-item', 'active');
                item.classList.remove('hidden');
              } else {
                item.setAttribute('data-carousel-item', '');
                item.classList.add('hidden');
              }
            });
          }
    
          prevButton.addEventListener('click', () => {
            currentIndex = Math.max(0, currentIndex - 1);
            updateCarousel();
          });
    
          nextButton.addEventListener('click', () => {
            currentIndex = Math.min(items.length - 1, currentIndex + 1);
            updateCarousel();
          });
    
          updateCarousel();
        }
      }, []);
    
      
    return(
        <>
            
            <section>
            <div id="custom-controls-gallery" className="bg-soft-white rounded-lg shadow dark:bg-gray-900 m-4 " data-carousel="slide">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                <img src="/p8.webp" className="absolute block w-full h-full max-w-full max-h-full object-fill -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt=""/>
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                <img src="/p9.jpg" className="absolute block w-full h-full max-w-full max-h-full object-fill -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt=""/>
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                <img src="/r3.jpg" className="absolute block w-full h-full max-w-full max-h-full object-fill -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt=""/>
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item="active">
                <img src="/pp1.png" className="absolute block w-full h-full max-w-full max-h-full object-fill -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt=""/>
                </div>
                <div className="hidden duration-700 ease-in-out" data-carousel-item>
                <img src="/pp9.jpg" className="absolute block w-full h-full max-w-full max-h-full object-fill -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt=""/>
                </div>
            </div>
                <div className="flex justify-center items-center pt-4 pb-4">
                    <button type="button" className="flex justify-center items-center mr-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
                            <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
                                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path></svg>
                                <span className="sr-only">Previous</span>
                            </span>
                        </button>
                        <button type="button" className="flex justify-center items-center h-full cursor-pointer group focus:outline-none" data-carousel-next>
                            <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
                                <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span className="sr-only">Next</span>
                            </span>
                    </button>
                </div>
            </div>

            </section>
            

        </>
    )
}