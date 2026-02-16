import './employedBlockSection.scss';
import { BuildingIcon } from '@/assets/building';

const EmployedBlockSection = () => (
   <div id="employed-block" className="section">
      <div className="icon">
         <BuildingIcon />
      </div>
      <p className="text">
         Currently employed in: <span className="secondary-color">Home.pl</span>
      </p>
   </div>
);

export default EmployedBlockSection;
