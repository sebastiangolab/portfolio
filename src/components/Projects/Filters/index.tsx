import { ReactElement } from 'react';
import './filters.scss';

interface FiltersProps {
   elements: string[];
   activeElement: number;
}

const Filters = ({
   elements,
   activeElement,
}: FiltersProps): ReactElement<FiltersProps> => {
   return (
      <div className="filters">
         <div className="title">Filter by:</div>
         {elements.map((filter, index) => (
            <button
               className={`option ${index === activeElement ? 'active' : ''}`}
            >
               {filter}
            </button>
         ))}
      </div>
   );
};

export default Filters;
