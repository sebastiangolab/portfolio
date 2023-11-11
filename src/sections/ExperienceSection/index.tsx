import './experienceSection.scss';
import SubTitle from '@/components/SubTitle';

interface Row {
   name: string;
   position: string;
   period: string;
}

const rows = [
   {
      name: 'Home.pl',
      position: 'Frontend developer',
      period: '10.05.2022 - now',
   },
   {
      name: 'Intermania Wadowice',
      position: 'Web Developer',
      period: '01.09.2018 - 21.10.2022',
   },
];

const ExperienceSection = () => (
   <div id="experience" className="section">
      <SubTitle>Experience History</SubTitle>

      {rows.map((row: Row) => (
         <div className="row">
            <div className="column">
               <p className="label">Company name</p>
               <p className="text">{row.name}</p>
            </div>

            <div className="column">
               <p className="label">Position</p>
               <p className="text">{row.position}</p>
            </div>

            <div className="column">
               <p className="label">Period of employment</p>
               <p className="text">{row.period}</p>
            </div>
         </div>
      ))}
   </div>
);

export default ExperienceSection;
