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

              return filterRealizations.length > 0 ? true : false;
           }) || [];

   return (
      <TransitionGroup className="realizations">
         {data
            ? data.map((realization: Realization, index) => {
                 const { image, link, title } = realization;

                 return (
                    <CSSTransition
                       key={`${title}-${index}`}
                       classNames="fade"
                       timeout={{ enter: 300, exit: 300 }}
                    >
                       <Link
                          href={link}
                          title={title}
                          target="_blank"
                          className="realization"
                       >
                          <div className="image-wrapper">
                             <div className="hover-content">
                                <div className="background"></div>
                                <p className="preview">Click to preview</p>
                             </div>

                             <Image
                                className="image"
                                src={image.url}
                                width={409}
                                height={218}
                                alt={`page ${title}`}
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
