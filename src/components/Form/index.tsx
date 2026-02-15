'use client';

import './form.scss';
import Button from '../Button';
import { ReactElement, ReactNode, useState, useCallback } from 'react';
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
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleOnChangeInput = useCallback((
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
   ) => {
      const fieldName = event.target.name;
      const fieldValue = event.target.value;

      setFormData(prevState => ({
         ...prevState,
         [fieldName]: fieldValue,
      }));
   }, []);

   const handleOnSubmit = useCallback(async (event: React.BaseSyntheticEvent) => {
      event.preventDefault();

      if (isSubmitting) return;

      setIsSubmitting(true);
      setFormSubmitMessage('');

      try {
         const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
         });

         const data = await response.json();

         if (response.ok) {
            setFormData({
               name: '',
               email: '',
               message: '',
            });
            setFormSubmitMessage('The form has been successfully sent');
         } else {
            setFormSubmitMessage(data.error || 'Something went wrong. Please try again later.');
         }
      } catch (error) {
         console.error('Form submission error:', error);
         setFormSubmitMessage('Network error. Please check your connection and try again.');
      } finally {
         setIsSubmitting(false);
      }
   }, [formData, isSubmitting]);

   return (
      <div className="form-wrapper">
         {title ? <h2 className="form-title">{title}</h2> : null}

         <form
            acceptCharset="UTF-8"
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
               type="email"
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
               minLength={10}
            />

            <Button
               text={isSubmitting ? 'Sending...' : 'Send message'}
               title="send form message"
               isFormButton
               disabled={isSubmitting}
            />

            {formSubmitMessage ? (
               <div className="message">{formSubmitMessage}</div>
            ) : null}
         </form>
      </div>
   );
};

export default Form;
