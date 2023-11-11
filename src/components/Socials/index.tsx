import './socials.scss';
import Link from 'next/link';
import { LinkedinIcon } from '@/assets/linkedin';
import { GithubIcon } from '@/assets/github';
import { InstagramIcon } from '@/assets/instagram';
import { FacebookIcon } from '@/assets/facebook';

const Socials = () => (
   <div className="socials">
      <Link
         href="https://www.linkedin.com/in/sebastian-golab/"
         target="_blank"
         className="icon linkedin"
      >
         <LinkedinIcon />
      </Link>

      <Link
         href="https://github.com/sebastiangolab"
         target="_blank"
         className="icon git"
      >
         <GithubIcon />
      </Link>

      <Link
         href="https://www.instagram.com/seebastiangolab/"
         target="_blank"
         className="icon instagram"
      >
         <InstagramIcon />
      </Link>

      <Link
         href="https://www.facebook.com/golomp1997/"
         target="_blank"
         className="icon facebook"
      >
         <FacebookIcon />
      </Link>
   </div>
);

export default Socials;
