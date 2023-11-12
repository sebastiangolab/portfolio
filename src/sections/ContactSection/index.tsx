import './contactSection.scss';
import Form from '@/components/Form';
import PageIntro from '@/components/PageIntro';
import Paragraph from '@/components/Paragraph';
import Socials from '@/components/Socials';
import Link from 'next/link';

const ContactSection = () => (
   <div id="contact-section" className="section">
      <div className="contact-content">
         <PageIntro title={<span className="primary-color">Contact</span>}>
            <Paragraph>
               If you have questions or you want to cooperate with me, please
               contact with me using contact details or form.
            </Paragraph>
         </PageIntro>

         <div className="row">
            <div className="label">Telephone</div>

            <Link
               className="value"
               href="tel:+48886165556"
               title="my mobile number"
            >
               +48 886 165 556
            </Link>
         </div>

         <div className="row">
            <div className="label">Email</div>

            <Link
               className="value"
               href="mailto:sebagolab97@gmail.com"
               title="my address email"
            >
               sebagolab97@gmail.com
            </Link>
         </div>

         <div className="row">
            <div className="label">Socials</div>

            <Socials />
         </div>
      </div>

      <div className="form-container">
         <Form title="Fill in the form" />
      </div>
   </div>
);

export default ContactSection;
