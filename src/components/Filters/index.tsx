import './filters.scss';
import { MouseEvent, ReactElement, useCallback, memo } from 'react';

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
   const handleOnClick = useCallback(
      (event: MouseEvent) => {
         const target = event.currentTarget as HTMLInputElement;
         setActiveFilter(target.id);
      },
      [setActiveFilter],
   );

   return (
      <>
         <p className="filters-text">
            Filtered by: <span className="primary-color">{activeElement}</span>
         </p>
         <div className="filters">
            {elements.map(filter => (
               <button
                  id={filter}
                  key={filter}
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

export default memo(Filters);
