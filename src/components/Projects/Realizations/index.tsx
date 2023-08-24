import './realizations.scss';
import Image from 'next/image';
import { performRequest } from '@/lib/datocms';
import Link from 'next/link';
import Filters from '../Filters';

const PROJECTS_QUERY = `query Realizations {
    allRealizations(first: 100) {
       image {
        url
       }
       link
       title
       technologies
   }
 }`;

interface Realization {
   image: {
      url: string;
   };
   link: string;
   title: string;
   technologies: string[];
}

const Realizations = async () => {
   const { data } = await performRequest({
      query: PROJECTS_QUERY,
   });
   //    const [activeFilterIndex, setActiveFilterIndex] = useState<number>(0);

   const allRealizations: Realization[] | undefined = data?.allRealizations;

   const filters: string[] = ['All'];
   if (allRealizations) {
      allRealizations.forEach(realization => {
         realization.technologies.forEach(technology => {
            if (!filters.find(filter => filter === technology)) {
               filters.push(technology);
            }
         });
      });
   }

   return (
      <>
         <Filters elements={filters} activeElement={0} />

         <div className="realizations">
            {allRealizations
               ? allRealizations.map((realization: Realization) => {
                    const { image, link, title } = realization;

                    return (
                       <Link
                          href={link}
                          title={title}
                          target="_blank"
                          className="realization"
                       >
                          <div className="hover-content">
                             <div className="background"></div>
                             <h2 className="title">{title}</h2>
                             <p className="preview">Click to preview</p>
                          </div>

                          <Image
                             className="image"
                             src={image.url}
                             width={409}
                             height={218}
                             alt={`page ${title}`}
                          />
                       </Link>
                    );
                 })
               : null}
         </div>
      </>
   );
};

export default Realizations;
