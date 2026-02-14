import './formInput.scss';

interface FormInputProps {
   label: string;
   name: string;
   value: string;
   onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
   ) => void;
   isRequired?: boolean;
   isTextArea?: boolean;
   type?: 'text' | 'email';
   minLength?: number;
   maxLength?: number;
}

const FormInput = ({
   label,
   name,
   value,
   onChange,
   isRequired,
   isTextArea,
   type = 'text',
   minLength,
   maxLength,
}: FormInputProps) => {
   const handleOnInvalid = (event: React.BaseSyntheticEvent) => {
      if (event.target.validity.valueMissing) {
         event.target.setCustomValidity('This field is required');
      } else if (event.target.validity.typeMismatch) {
         event.target.setCustomValidity('Please enter a valid email address');
      } else if (event.target.validity.tooShort) {
         event.target.setCustomValidity(
            `Minimum length is ${minLength} characters`
         );
      } else {
         event.target.setCustomValidity('Invalid input');
      }
   };

   const handleOnInput = (e: React.BaseSyntheticEvent) => {
      e.target.setCustomValidity('');
   };

   return (
      <div className="form-row">
         <label htmlFor={name} className="label">
            {label}
         </label>
         {isTextArea ? (
            <textarea
               id={name}
               name={name}
               onChange={onChange}
               onInvalid={handleOnInvalid}
               onInput={handleOnInput}
               value={value}
               required={isRequired}
               minLength={minLength}
               maxLength={maxLength}
            ></textarea>
         ) : (
            <input
               id={name}
               type={type}
               name={name}
               onChange={onChange}
               onInvalid={handleOnInvalid}
               onInput={handleOnInput}
               value={value}
               required={isRequired}
               minLength={minLength}
               maxLength={maxLength}
            />
         )}
      </div>
   );
};

export default FormInput;
