import { motion } from 'framer-motion';
import { ShieldCheckIcon, UserPlusIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50"> 
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            JWT Kimlik Doğrulama Sistemi
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Güvenli ve modern bir kimlik doğrulama sistemi ile uygulamanızı koruyun  
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card group hover:bg-primary-50"
          >
            <div className="flex items-center mb-4">
              <ShieldCheckIcon className="h-8 w-8 text-primary-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Güvenli Giriş</h2>    
            </div>
            <p className="text-gray-600 mb-6">
              JWT tabanlı güvenli kimlik doğrulama sistemi ile güvenli bir şekilde giriş yapın.
            </p>
            <a href="/login" className="btn-primary inline-flex items-center">
              Giriş Yap
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="card group hover:bg-secondary-50"
          >
            <div className="flex items-center mb-4">
              <UserPlusIcon className="h-8 w-8 text-secondary-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Hesap Oluştur</h2>    
            </div>
            <p className="text-gray-600 mb-6">
              Hızlı ve kolay bir şekilde yeni hesap oluşturun ve sisteme katılın.    
            </p>
            <a href="/register" className="btn-secondary inline-flex items-center">
              Kayıt Ol
              <ArrowRightIcon className="h-5 w-5 ml-2" />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;