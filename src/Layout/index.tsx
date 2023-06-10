import { Navbar } from 'components/features';

interface LayoutProps {
  children: React.ReactElement;
}
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <>
        <Navbar />
      </>
      <main>{children}</main>
    </>
  );
};
