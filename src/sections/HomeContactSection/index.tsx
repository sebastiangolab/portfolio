import './homeContactSection.scss';
import contactImageRetina from '@/assets/contact-image@2x.webp';
import SubTitle from '@/components/SubTitle';
import Form from '@/components/Form';
import Image from 'next/image';

const HomeContactSection = () => (
   <div id="home-contact" className="section">
      <div className="form-image">
         <Image
            className="avatar"
            alt="photo introducing me"
            src={contactImageRetina.src}
            fill
            loading="lazy"
            placeholder="blur"
            blurDataURL={contactImageRetina.blurDataURL}
         />
      </div>

      <div className="form-container">
         <SubTitle>
            <span className="primary-color">Contact</span> Form
         </SubTitle>

         <Form />
      </div>
   </div>
);

export default HomeContactSection;
