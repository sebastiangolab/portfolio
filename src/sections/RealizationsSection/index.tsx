import './realizationsSection.scss';
import Button from '@/components/Button';
import Filters from '@/components/Filters';
import Loader from '@/components/Loader';
import Realizations from '@/components/Realizations';
import SubTitle from '@/components/SubTitle';
import useRealizations from '@/hooks/useRealizations';
import { ReactNode } from 'react';

interface RealizationsSection {
   title?: ReactNode;
   hasNewestOnly?: boolean;
}

const RealizationsSection = ({ title, hasNewestOnly }: RealizationsSection) => {
   const {
      isLoading,
      allRealizations,
      newestRealizations,
      filters,
      activeFilter,
      setActiveFilter,
   } = useRealizations();

   return (
      <div id="realizations" className="section">
         <SubTitle isCenter>{title}</SubTitle>

         {isLoading ? (
            <Loader />
         ) : (
            <>
               {hasNewestOnly ? null : (
                  <Filters
                     elements={filters}
                     activeElement={activeFilter}
                     setActiveFilter={setActiveFilter}
                  />
               )}

               <Realizations
                  realizationsData={
                     hasNewestOnly ? newestRealizations : allRealizations
                  }
                  activeFilter={activeFilter}
               />

               {hasNewestOnly ? (
                  <div className="see-more">
                     <Button
                        href="/projects"
                        text={'See all projects'}
                        title={'See all projects'}
                     />
                  </div>
               ) : null}
            </>
         )}
      </div>
   );
};

export default RealizationsSection;
