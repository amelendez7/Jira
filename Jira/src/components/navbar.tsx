import type { FC } from "react";
import { UserToggle } from "../components/userToggle";
import { DarkThemeToggle, Navbar } from "flowbite-react";




const ExampleNavbar: FC = function () {
  return (
    <Navbar fluid className="fixed top-0 w-full z-50 bg-white shadow-md">
      <div className="w-full p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navbar.Brand href="https://bo.glassmountainbpo.com/">
              <img alt="" src="/images/glass/logo.svg" className="mr-3 h-7 sm:h-12 dark:hidden" />
              <img alt="" src="/images/glass/logo.png" className="mr-3 h-7 sm:h-12 hidden dark:block" />
              <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              </span>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <Navbar.Link href="/Dashboard" className="ml-8">
                Dashboard
              </Navbar.Link>

              <Navbar.Link href="/cards">Gift Cards</Navbar.Link>
              <Navbar.Link href="/requisitions">Requisitions</Navbar.Link>
              <Navbar.Link href="/vendors">Vendors</Navbar.Link>
              <Navbar.Link href="/users">Users</Navbar.Link>
            </Navbar.Collapse>
          </div>
          <div className="flex items-center gap-3">
            {/* <iframe
              height="30"
              src="https://ghbtns.com/github-btn.html?user=themesberg&repo=flowbite-react-admin-dashboard&type=star&count=true&size=large"
              title="GitHub"
              width="90"
              className="hidden sm:block"
            /> */}

            

            <UserToggle />
         
            <DarkThemeToggle />
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default ExampleNavbar;
