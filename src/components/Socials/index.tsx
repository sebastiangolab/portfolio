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
         title="linkedin"
         aria-label="My linkedin profile"
      >
         <LinkedinIcon />
      </Link>

      <Link
         href="https://github.com/sebastiangolab"
         target="_blank"
         className="icon git"
         title="git"
         aria-label="My git profile"
      >
         <GithubIcon />
      </Link>

      <Link
         href="https://www.instagram.com/seebastiangolab/"
         target="_blank"
         className="icon instagram"
         title="instagram"
         aria-label="My instagram profile"
      >
         <InstagramIcon />
      </Link>

      <Link
         href="https://www.facebook.com/golomp1997/"
         target="_blank"
         className="icon facebook"
         title="facebook"
         aria-label="My facebook profile"
      >
         <FacebookIcon />
      </Link>
   </div>
);

export default Socials;
