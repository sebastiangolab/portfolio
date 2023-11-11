import './form.scss';
import Button from '../Button';
import { ReactElement, ReactNode, useState } from 'react';
import FormInput from '@/components/FormInput';

interface FormProps {
   title?: ReactNode;
}

const Form = ({ title }: FormProps): ReactElement => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
   });
   const [formSubmitMessage, setFormSubmitMessage] = useState('');

   const handleOnChangeInput = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
   ) => {
      const fieldName = event.target.name;
      const fieldValue = event.target.value;

      setFormData(prevState => ({
         ...prevState,
         [fieldName]: fieldValue,
      }));
   };

   const handleOnSubmit = (event: React.BaseSyntheticEvent) => {
      event.preventDefault();

      const formURL = 'https://api.emailjs.com/api/v1.0/email/send-form';
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
         data.append(key, value);
      });

      data.append('service_id', 'service_ylfb7k5');
      data.append('template_id', 'template_4zaip1p');
      data.append('user_id', 'rWyeA2XdvhB_fvPEW');

      fetch(formURL, {
         method: 'POST',
         body: data,
      })
         .then(response => {
            console.log(response);
            if (response.ok) {
               setFormData({
                  name: '',
                  email: '',
                  message: '',
               });

               setFormSubmitMessage('The form has been successfully sent');
            }
         })
         .catch(error => {
            setFormSubmitMessage(
               'Something is wrong, please try send form later',
            );
         });
   };

   return (
      <div className="form-wrapper">
         {title ? <h2 className="form-title">{title}</h2> : null}

         <form
            accept-charset="UTF-8"
            method="POST"
            className="form"
            onSubmit={handleOnSubmit}
         >
            <FormInput
               label="Name"
               name="name"
               value={formData.name}
               onChange={handleOnChangeInput}
               isRequired
            />

            <FormInput
               label="Email"
               name="email"
               value={formData.email}
               onChange={handleOnChangeInput}
               isRequired
            />

            <FormInput
               label="Message"
               name="message"
               value={formData.message}
               onChange={handleOnChangeInput}
               isTextArea
            />

            <Button
               text="Send message"
               title="send form message"
               isFormButton
            />

            {formSubmitMessage ? (
               <div className="message">{formSubmitMessage}</div>
            ) : null}
         </form>
      </div>
   );
};

export default Form;
