import './homeContactSection.scss';
import contactImage from '@/assets/contact-image.jpg';
import contactImageRetina from '@/assets/contact-image@2x.jpg';
import SubTitle from '@/components/SubTitle';
import Form from '@/components/Form';

const HomeContactSection = () => (
   <div id="home-contact" className="section">
      <div className="form-image">
         <img
            src={contactImage.src}
            srcSet={`${contactImageRetina.src} 2x`}
            alt="my face avatar"
            className="avatar"
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
