import type { RouteObject } from 'react-router';
import AppLayout from './appLayout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AccountSearch from "./pages/AccountSearch";
import AccountObjectDetail from "./pages/AccountObjectDetailPage";
import MyPage from './pages/MyPage';
import Contacts from './pages/Contacts';
import MutationTest from './pages/MutationTest';

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
        handle: { showInNavigation: true, label: "Home" }
      },
      {
        path: '*',
        element: <NotFound />
      },
      {
        path: "accounts/:recordId",
        element: <AccountObjectDetail />
      },
      {
        path: "accounts",
        element: <AccountSearch />
      },
      {
        path:"my-page",
        element:<MyPage/>,
        handle: { showInNavigation: true, label: "My Page" }
      },
      {
        path:"contacts",
        element:<Contacts/>,
        handle: { showInNavigation: true, label: "Contacts" }
      },
      {
        path:"mutation-test",
        element:<MutationTest/>,
        handle: { showInNavigation: true, label: "🧪 Mutation Test" }
      }
    
    ]
  }
];
