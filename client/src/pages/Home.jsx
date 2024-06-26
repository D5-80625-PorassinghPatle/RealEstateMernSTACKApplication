import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import { motion } from 'framer-motion';
import ListingItem from '../components/ListingItem';
const styles = `@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

.animate-marquee {
  animation: marquee 65s linear infinite;
}
  
  .logo-container img {
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
`;


SwiperCore.use([Navigation]);

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div>
      {/* top */}
      <motion.div
        className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 className='text-slate-700 font-bold text-3xl lg:text-6xl' variants={itemVariants}>
          Find your next <span className='text-slate-500'>Perfect</span>
          <br />
          Luxury Palace Here
        </motion.h1>
        <motion.div className='text-gray-400 text-xs sm:text-sm' variants={itemVariants}>
        Swirl Real Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link
            to={'/search'}
            className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
          >
            Let's get started...
          </Link>
        </motion.div>
      </motion.div>

      {/* Logos of brands */}
      <style>{styles}</style>
      <div className="flex justify-center items-center overflow-hidden my-8 logo-container">
        <div className="flex space-x-10 animate-marquee">
       
        
        <img src="https://media.licdn.com/dms/image/D4D22AQF3wTT-zzOTnw/feedshare-shrink_2048_1536/0/1684329437170?e=2147483647&v=beta&t=z3uNB_cZ71tXIE58hR8Wz9SQZavPNcCMDGtNJ3w-Tj8" alt="Bugatti Logo" className="mx-4" />
        <img src="https://drehomes.com/admin_d8p7Q69Btdcxdxmg/assets/media/project/dev/proj_dev_img_3220_bugatti-residences-logo.png" alt="Bugatti Logo" className="mx-4" />
        <img src="https://noblelandre.com/wp-content/uploads/2022/12/Binghatti-logo-dark.png" alt="Bugatti Logo" className="mx-4" />
        <img src="https://manage.tanamiproperties.com/Project/Project_Logo/1497/Thumb/1497.webp" alt="Bugatti Logo" className="mx-4" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Lodha---New-LOgo.png/800px-Lodha---New-LOgo.png" alt="Bugatti Logo" className="mx-4" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoLvJwpmfSlc9NL8QH8vnsYloVoYXVCmUx8A&s" alt="Bugatti Logo" className="mx-4" />

          
        </div>
      </div>

      {/* swiper */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Swiper navigation>
          {offerListings &&
            offerListings.length > 0 &&
            offerListings.map((listing) => (
              <SwiperSlide key={listing._id}>
                <div
                  style={{
                    background: `url(${listing.imageUrls[0]}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                  className='h-[500px]'
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>
      </motion.div>

      {/* listing results for offer, sale and rent */}
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className='my-3' variants={itemVariants}>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent offers</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show more offers</Link>
            </motion.div>
            <motion.div className='flex flex-wrap gap-4' variants={containerVariants}>
              {offerListings.map((listing) => (
                <motion.div key={listing._id} variants={itemVariants}>
                  <ListingItem listing={listing} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
        {rentListings && rentListings.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className='my-3' variants={itemVariants}>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show more places for rent</Link>
            </motion.div>
            <motion.div className='flex flex-wrap gap-4' variants={containerVariants}>
              {rentListings.map((listing) => (
                <motion.div key={listing._id} variants={itemVariants}>
                  <ListingItem listing={listing} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
        {saleListings && saleListings.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className='my-3' variants={itemVariants}>
              <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
              <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show more places for sale</Link>
            </motion.div>
            <motion.div className='flex flex-wrap gap-4' variants={containerVariants}>
              {saleListings.map((listing) => (
                <motion.div key={listing._id} variants={itemVariants}>
                  <ListingItem listing={listing} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
