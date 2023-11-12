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
}

const FormInput = ({
   label,
   name,
   value,
   onChange,
   isRequired,
   isTextArea,
}: FormInputProps) => {
   const handleOnInvalid = (event: React.BaseSyntheticEvent) => {
      event.target.setCustomValidity('This field is required');
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
            ></textarea>
         ) : (
            <input
               id={name}
               type="text"
               name={name}
               onChange={onChange}
               onInvalid={handleOnInvalid}
               onInput={handleOnInput}
               value={value}
               required={isRequired}
            />
         )}
      </div>
   );
};

export default FormInput;
