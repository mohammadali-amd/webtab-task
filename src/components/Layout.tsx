import Header from './Header'

interface LayoutProps {
   children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
   return (
      <div>
         <Header />
         <div className="container my-5">
            {children}
         </div>
      </div>
   )
}

export default Layout
