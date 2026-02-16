import './realizations.scss';
import Image from 'next/image';
import Link from 'next/link';
import { DEFAULT_FILTER, Realization } from '@/hooks/useRealizations';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useMemo } from 'react';

interface RealizationsProps {
   realizationsData: Realization[] | null;
   activeFilter: string;
}

const Realizations = ({
   realizationsData,
   activeFilter,
}: RealizationsProps) => {
   // Memoize filtered data - only recalculate when inputs change
   const data = useMemo(() => {
      if (!realizationsData) return [];

      if (activeFilter === DEFAULT_FILTER) {
         return realizationsData;
      }

      return realizationsData.filter((realization: Realization) =>
         realization.technologies.includes(activeFilter),
      );
   }, [realizationsData, activeFilter]);

   return (
      <TransitionGroup className="realizations">
         {data.map((realization: Realization, index) => {
            const { image, link, title } = realization;

            return (
               <CSSTransition
                  classNames="fade"
                  key={`${title}-${index}`}
                  timeout={{ enter: 300, exit: 300 }}
               >
                  <Link
                     className="realization"
                     href={link}
                     target="_blank"
                     title={title}
                  >
                     <div className="image-wrapper">
                        <div className="hover-content">
                           <div className="background"></div>
                           <p className="preview">Click to preview</p>
                        </div>

                        <Image
                           alt={`page ${title}`}
                           className="image desktop-hide"
                           src={image.url}
                           width={517}
                           height={262}
                           loading="lazy"
                           sizes="(max-width: 768px) 100vw, 517px"
                        />

                        <Image
                           alt={`page ${title}`}
                           className="image mobile-hide"
                           src={image.url}
                           width={414}
                           height={233}
                           loading="lazy"
                           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 414px"
                        />
                     </div>

                     <h2 className="realization-title">{title}</h2>
                  </Link>
               </CSSTransition>
            );
         })}
      </TransitionGroup>
   );
};

export default Realizations;
