import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import axios from 'axios'
import MyHeader from './myheader';


export default function MyLayout(props) {
  const [username, seUsername] = useState(null);
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState(null);
  const [firstname, seFirstname] = useState(null);
  const [lastname, seLastname] = useState(null);
  const [phone, sePhone] = useState(null);
  const [dob, deDob] = useState(null);
  const [blocked, seBlocked] = useState(null);
  const [role, setRole] = useState(null);
  const [ammount, setAmmount] = useState(null);

  function handleDropdownToggle() {
    const dropdown = document.getElementById('dropdownAvatarName');
    dropdown.classList.toggle('hidden');
  }

  

  const router = useRouter()
    useEffect(() => {
      if (typeof window !== 'undefined')// checks if the code is running on the client-side and not on the server-side.
      {
          const session = sessionStorage.getItem('username');
          if (session) {
            seUsername(sessionStorage.getItem('username'));
            setFile(sessionStorage.getItem('filename'));
            setEmail(sessionStorage.getItem('email'));
            seFirstname(sessionStorage.getItem('firstname'));
            seLastname(sessionStorage.getItem('lastname'));
            setRole(sessionStorage.getItem('role'));
          }          
      }
  
  }, []);

      const handleSignOut = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get('http://server-octoo-shop-production.up.railway.app/moderator/logout')
            console.log(response.data)
            sessionStorage.removeItem('username');
            seUsername(null);
            sessionStorage.removeItem('filename');
            setFile(null);
            sessionStorage.removeItem('email');
            setEmail(null);
            sessionStorage.removeItem('firstname');
            seFirstname(null);
            sessionStorage.removeItem('lastname');
            seLastname(null);
            sessionStorage.removeItem('phone');
            sePhone(null);
            sessionStorage.removeItem('dob');
            deDob(null);
            sessionStorage.removeItem('blocked');
            seBlocked(null);
            sessionStorage.removeItem('ammount');
            sessionStorage.removeItem('id');
            sessionStorage.removeItem('role');
            setAmmount(null);
            router.push('/');
          } catch (error) {
            console.error(error)
          }

    };

  return (
    <>
      <MyHeader title={props.title} />

      <nav className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
  <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-5">
    <div className="flex items-center justify-between py-2 md:py-3 md:block">
            <a href="/" className="flex items-center justify-center">
              <img
                src="/octo.svg"
                width={35}
                height={4}
                alt="Float UI logo"
                style={{ marginRight: '10px', marginBottom: '10px', marginUp: '10px' }}
              />
              <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 mb-4 text-base font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl dark:text-white">Octo <mark class="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">Shop</mark></span>
            </a>
          </div>
          <div className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 `}>
            <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                <a
                    href="/"
                    className={`block py-2 pl-3 pr-4 ${
                      router.pathname === '/'
                        ? 'text-blue-600'
                        : 'text-gray-900'
                    } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className={`block py-2 pl-3 pr-4 ${
                      router.pathname === '/about'
                        ? 'text-blue-600'
                        : 'text-gray-900'
                    } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className={`block py-2 pl-3 pr-4 ${
                      router.pathname === '/contact'
                        ? 'text-blue-600'
                        : 'text-gray-900'
                    } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                  >
                    Contact
                  </a>
                </li>
                <span className='hidden w-px h-6 bg-gray-300 md:block'></span>

                {username !== null ? (
                      <>        
                      <img class="h-1 mr-6 rounded-full hover:text-blue-700 hover:cursor-pointer flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent" src={`http://server-octoo-shop-production.up.railway.app/moderator/getimage/${file}`} alt="user photo" style={{width: "32px", height: "32px"}} />
                      <a href={role === 'user' ? '/user/userPanel' : '/moderator/panel'} class="hover:text-blue-700 hover:cursor-pointer name-span flex items-center justify-between w-full py-2 pl-3 pr-4 pl-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 ">{firstname} {lastname}</a> &nbsp;
                      <a>
                          <svg onClick={handleSignOut} class="h-7 w-7 text-blue-500 cursor-pointer"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  
                              <path stroke="none" d="M0 0h24v24H0z"/>  
                              <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  
                              <path d="M7 12h14l-3 -3m0 6l3 -3" />
                          </svg>        
                      </a>
                      
  
                      </>
                    ) : (

                        <>
                        <li>
                      <a
                        href="/login"
                        className={`block py-2 pl-3 pr-4 ${
                          router.pathname === '/login'
                            ? 'text-blue-600'
                            : 'text-gray-900'
                        } rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}
                      >
                        Login
                      </a>
                    </li>
                    <div className='space-y-3 items-center gap-x-6 md:flex md:space-y-0'>
                        <li>
                            <a href="/register" className="block py-3 px-4 font-medium text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow md:inline">
                                Sign in
                            </a>
                        </li>
                    </div>
                        </>
                    
                    )}
              </ul>
            </ul>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-screen-xl p-4">
        {props.children}
      </main>
    </>
  )
}