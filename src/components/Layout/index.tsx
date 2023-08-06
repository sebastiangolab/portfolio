import { ReactElement } from 'react';
import './layout.scss';

interface LayoutProps {
   children: ReactElement;
}

const Layout = ({ children }: LayoutProps): ReactElement<LayoutProps> => (
   <div className="layout">
      <div className="container">{children}</div>
   </div>
);

export default Layout;
