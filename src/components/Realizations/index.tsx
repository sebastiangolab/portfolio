import './realizations.scss';
import Image from 'next/image';
import Link from 'next/link';
import { DEFAULT_FILTER, Realization } from '@/hooks/useRealizations';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

interface RealizationsProps {
   realizationsData: Realization[] | null;
   activeFilter: string;
}

const Realizations = ({
   realizationsData,
   activeFilter,
}: RealizationsProps) => {
   const data =
      activeFilter === DEFAULT_FILTER
         ? realizationsData
         : realizationsData?.filter((realization: Realization) => {
              const filterRealizations = realization.technologies.filter(
                 (technology: string) => technology === activeFilter,
              );

              return filterRealizations.length > 0;
           }) || [];

   return (
      <TransitionGroup className="realizations">
         {data
            ? data.map((realization: Realization, index) => {
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
                             />

                             <Image
                                alt={`page ${title}`}
                                className="image mobile-hide"
                                src={image.url}
                                width={414}
                                height={233}
                                loading="lazy"
                             />
                          </div>

                          <h2 className="realization-title">{title}</h2>
                       </Link>
                    </CSSTransition>
                 );
              })
            : null}
      </TransitionGroup>
   );
};

export default Realizations;
