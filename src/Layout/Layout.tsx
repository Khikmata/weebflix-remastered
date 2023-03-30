import { Navbar } from "../components/Navbar";

interface LayoutProps {
  children: React.ReactElement;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <main>{children}</main>
    </>
  )
}
export default Layout;