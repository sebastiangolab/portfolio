import './socials.scss';
import Link from 'next/link';
import { LinkedinIcon } from '@/images/linkedin';
import { GithubIcon } from '@/images/github';
import { InstagramIcon } from '@/images/instagram';
import { FacebookIcon } from '@/images/facebook';

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
