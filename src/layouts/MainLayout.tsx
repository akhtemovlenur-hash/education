import type { FunctionComponent, ReactNode } from "react";
import Header from "../components/Header";

interface IMainLayoutProps {
  children: ReactNode;
}

const MainLayout: FunctionComponent<IMainLayoutProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <main className="main-layout__content">{children}</main>
    </div>
  );
};

export default MainLayout;
