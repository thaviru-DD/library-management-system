'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/shared/Navbar';
import Image from 'next/image';
import Footer from '@/components/shared/Footer';
import { div, h1 } from 'framer-motion/client';



const credDescriptions = [
  {title:"Book Sales" , description:"Explore a wide collection of books from different categories, including fiction, novels, educational books, self-development, biographies, and more. Find your favorite books at affordable prices and discover something new to read." },
  {title:"Book Reservations" , description:"Reserve books that you are interested in before visiting the shop. Our reservation service helps you secure popular or limited-availability books, so you can easily collect them when they become available." },
  {title:"Book Delivery" , description:"Order your favorite books from the comfort of your home and have them delivered directly to your doorstep. We provide a convenient and reliable delivery service to make buying books easier and more accessible." },
  {title:"Book Recommendations" , description:"Not sure what to read next? Get helpful book recommendations based on your interests, preferred genres, favorite authors, and reading habits. Our recommendations can help you." },
]

const updateStats =[
  {users: '248,078', description: 'TOTAL BOOKS'},
  {users: '22,313', description: 'TOTAL PERIODICALS'},
  {users: '16,140', description: 'LIBRARY USERS'},
  {users: '4,325', description: 'DAILY USERS'}
]

export default function Home() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Make sure metadata (duration) is loaded before we try to scrub
    const handleLoadedMetadata = () => {
      window.addEventListener('scroll', handleScroll);
    };

    const handleScroll = () => {
      if (!video.duration) return;

      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = docHeight > 0 ? scrollTop / docHeight : 0;

      const targetTime = scrollFraction * video.duration;
      video.currentTime = targetTime;
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // In case metadata is already loaded by the time this runs
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/video/A_close_up_video_of_an_open_bo.mp4"
          id="bg-video"
          muted
          playsInline
          preload="auto"
        ></video>
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
      </div>

      <Navbar style='text-white' titleStyle='text-white' IconStyle='text-white' />

      <div className="px-6 sm:px-10 md:px-20 pt-12 md:pt-20">
        <motion.h4 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }} className="mt-12 md:mt-20 font-bold text-white">
          Welcome to,
        </motion.h4>

        <div className="flex flex-col md:flex-row md:justify-between mt-2 gap-6 md:gap-0">
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }} className="text-5xl sm:text-6xl md:text-7xl font-bold text-white">
            Creative <br /> Words
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }} className="w-full md:w-100">
            <h2 className="text-2xl md:text-3xl font-bold text-left md:text-end text-white">Explore unforgettable characters</h2>
            <p className="text-left md:text-end mt-4 text-white">Every book opens a new world waiting for you to explore today :)</p>
          </motion.div>
        </div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }} className="text-white/80 max-w-xl mt-8 text-base md:text-lg">
          Discover thousands of titles across every genre, reserve them in seconds, and pick them up at your local library.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut", delay: 0.55 }} className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link href="/books" className="px-8 py-3 rounded-full bg-white text-black font-semibold text-center hover:bg-white/90 transition-colors duration-300">
            Browse Books
          </Link>
          <Link href="/signup" className="px-8 py-3 rounded-full border border-white text-white font-semibold text-center hover:bg-white/10 transition-colors duration-300">
            Get Started
          </Link>
        </motion.div>
      </div>

      <div className='mt-20 md:mt-30 px-6 sm:px-10 md:px-15'>
        <h3 className='text-gray-200'>POPULAR BOOKS</h3>
        <div className='mt-5 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 justify-items-center items-center'>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            <Image src="/bookCovers/book4.jpeg" alt="Book Cover" width={200} height={300} className="w-full max-w-[160px] md:max-w-[200px] h-auto shadow-lg rounded-lg"/>
          </motion.div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}>
            <Image src="/bookCovers/book5.jpg" alt="Book Cover" width={200} height={300} className='w-full max-w-[160px] md:max-w-[200px] h-auto shadow-lg rounded-lg'/>
          </motion.div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}>
            <Image src="/bookCovers/book6.jpg" alt="Book Cover" width={200} height={300} className='w-full max-w-[160px] md:max-w-[200px] h-auto shadow-lg rounded-lg'/>
          </motion.div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.9 }}>
            <Image src="/bookCovers/book7.jpg" alt="Book Cover" width={200} height={300} className='w-full max-w-[160px] md:max-w-[200px] h-auto shadow-lg rounded-lg'/>
          </motion.div>
        </div>
      </div>

      <motion.div className='flex flex-col gap-6 text-white mt-20 md:mt-30 px-6' initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2}} variants={{hidden: {}, visible: {transition: { staggerChildren: 0.2,},},}}>
        <motion.div className='flex justify-center items-center' variants={{hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 },}}transition={{ duration: 0.6, ease: "easeOut" }}>
          <h1 className='w-full max-w-sm md:w-100 text-2xl md:text-4xl font-bold text-center'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, itaque?
          </h1>
        </motion.div>

        <motion.div className='flex justify-center items-center' variants={{hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 },}} transition={{ duration: 0.6, ease: "easeOut" }}>
        <p className='text-center w-full max-w-2xl md:w-200'>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore, deleniti omnis totam aliquam dolore, inventore doloribus exercitationem voluptatibus officia blanditiis quisquam eligendi eveniet obcaecati laborum, assumenda distinctio rem facilis placeat.
        </p>
       </motion.div>
      </motion.div>


      <div className='flex flex-col sm:flex-row flex-wrap justify-center sm:justify-between gap-6 mt-20 md:mt-30 px-6 md:px-20'>
        {credDescriptions.map((service) => 
          <div key={service.title} className='w-full sm:w-[45%] lg:w-60 h-auto lg:h-80 p-4 border border-gray-200 rounded-lg'>
              <h1 className='text-2xl text-white font-bold'>{service.title}</h1>
              <p className='mt-4 text-white'>{service.description}</p>
          </div>
        )}
      </div>

      <div className='flex flex-col md:flex-row justify-center gap-6 md:gap-10 items-center mt-20 md:mt-30 px-6'>
        <div className='w-full md:w-100 h-auto md:h-80 p-4 border border-gray-200 rounded-lg'>
          <h1 className='text-3xl md:text-4xl text-white font-bold'>Our Vison</h1>
          <p className='mt-4 text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laudantium debitis dolorem atque. Harum earum ducimus ut provident expedita enim nobis tempora, iure a id suscipit quidem, cumque iusto adipisci officiis voluptate ratione dolore autem? Rerum corporis voluptate odit placeat praesentium dolor aperiam architecto quibusdam nisi, consequatur inventore expedita commodi?</p>
        </div>
        <div className='w-full md:w-100 h-auto md:h-80 p-4 border border-gray-200 rounded-lg'>
          <h1 className='text-3xl md:text-4xl text-white font-bold'>Our Mission</h1>
          <p className='mt-4 text-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed laudantium debitis dolorem atque. Harum earum ducimus ut provident expedita enim nobis tempora, iure a id suscipit quidem, cumque iusto adipisci officiis voluptate ratione dolore autem? Rerum corporis voluptate odit placeat praesentium dolor aperiam architecto quibusdam nisi, consequatur inventore expedita commodi?</p>
        </div>
      </div>

      <div className='text-center mt-24 md:mt-40'>
        <h1 className='text-white text-4xl md:text-5xl font-bold'>Thank You !</h1>
      </div>
      
      {/* home page colour section */}
      <div className='bg-ivory w-full h-auto rounded-t-4xl mt-20 md:mt-30 px-6 md:px-20 py-8'>
        <div className='flex justify-center'>
          <div className=' w-50 h-2 rounded-full bg-[#1F150C]/50'></div>
        </div>

        {/* About us section */}

        <div className='flex flex-col md:flex-row gap-10 mt-14 md:mt-20'>
          <div className='flex flex-col gap-4 w-full'>
            <div className='flex flex-col gap-2'>
              <h1 className='text-4xl md:text-5xl font-bold text-[#1F150C]'>About us</h1>
              <div className='w-50 h-3 bg-[#1F150C] rounded-full'></div>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, nam itaque corrupti officiis necessitatibus dolor recusandae quibusdam rem saepe nostrum perferendis velit quod maxime? Libero, pariatur nisi id repellendus expedita corrupti excepturi nostrum sequi et quod. Facilis ipsum error fuga, earum ad a commodi eaque nostrum ea mollitia assumenda accusamus? Aspernatur, quae, iure at eligendi vel eveniet commodi ullam consequatur animi sapiente error placeat dolorem neque saepe dolore iste quaerat quibusdam corrupti amet. Dolores deserunt distinctio eligendi sint alias, blanditiis repudiandae mollitia! Numquam porro est repellat cum tempora earum soluta. In assumenda pariatur rem consequatur iusto debitis error voluptatem eius.</p>
          </div>
          <div className='w-full'>
            <Image src="/images/home-about.avif" className='rounded-full w-full h-auto' width={800} height={650} alt="About section image" />
          </div>
        </div>

        <div className='text-center bg-[#1F150C] w-full h-[1px] mt-14 md:mt-20'></div>

        {/* updated static section */}

        <div className='py-5'>
          <h1 className='text-3xl md:text-4xl font-bold text-[#1F150C] text-center'>Library Updated statistics</h1>

          <div className='flex flex-wrap justify-center md:justify-between gap-8 mt-14 md:mt-30 px-2 md:px-20'>
            {updateStats.map((stat)=>
              <div key={stat.description} className='w-[45%] sm:w-auto'>
                <h1 className='text-[#1F150C] font-bold text-center text-2xl md:text-4xl'>{`+${stat.users}`}</h1>
                <p className='text-center text-[#1F150C] mt-1 text-sm md:text-base'>{stat.description}</p>
              </div>
              )}
          </div>

        </div>

      </div>

      <Footer/>

      
      </div>
  );
}