import './filters.scss';
import { MouseEvent, ReactElement } from 'react';

interface FiltersProps {
   elements: string[];
   activeElement: string;
   setActiveFilter: (val: string) => void;
}

const Filters = ({
   elements,
   activeElement,
   setActiveFilter,
}: FiltersProps): ReactElement<FiltersProps> => {
   const handleOnClick = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLInputElement;
      setActiveFilter(target.id);
   };

   return (
      <>
         <p className="filters-text">
            Filtered by: <span className="primary-color">{activeElement}</span>
         </p>
         <div className="filters">
            {elements.map((filter, index) => (
               <button
                  id={filter}
                  key={`${filter}-${index}`}
                  className={`option ${
                     filter === activeElement ? 'active' : ''
                  }`}
                  onClick={handleOnClick}
               >
                  {filter}
               </button>
            ))}
         </div>
      </>
   );
};

export default Filters;
