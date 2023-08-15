import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { notificationProvider, RefineSnackbarProvider, ThemedLayoutV2 } from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import dataProvider, { GraphQLClient } from "../../src/index";
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";

import { CategoryCreate, CategoryEdit, CategoryList, CategoryShow } from "./pages/categories";
import Dashboard from "./pages/dashboard";
import { Header } from "./components";
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import ArticleIcon from '@mui/icons-material/Article';
import { PostCreate, PostEdit, PostList, PostShow } from "./pages/posts";

const API_URL = "http://localhost:8080/graphql/api/v1";

const client = new GraphQLClient(API_URL);
const gqlDataProvider = dataProvider(client);

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={gqlDataProvider}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "aZ3PDJ-GvDErn-Vq1SeV",
              }}
              resources={[
                {
                  name: "categories",
                  list: "/categories",
                  show: "/categories/show/:id",
                  create: "/categories/create",
                  edit: "/categories/edit/:id",
                  meta: {
                    label: "Categories",
                    icon: <AutoAwesomeMosaicIcon />
                  }
                },
                {
                  name: "posts",
                  list: "/posts",
                  show: "/posts/show/:id",
                  create: "/posts/create",
                  edit: "/posts/edit/:id",
                  meta: {
                    label: "Posts",
                    icon: <ArticleIcon />
                  }
                },
              ]}
            >
              <Routes>
                <Route
                  element={
                    <ThemedLayoutV2 Header={() => <Header sticky />}>
                      <Outlet />
                    </ThemedLayoutV2>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="categories">
                    <Route index element={<CategoryList />} />
                    <Route
                      path="show/:id"
                      element={<CategoryShow />}
                    />
                    <Route
                      path="edit/:id"
                      element={<CategoryEdit />}
                    />
                    <Route
                      path="create"
                      element={<CategoryCreate />}
                    />
                  </Route>
                  <Route path="posts">
                    <Route index element={<PostList />} />
                    <Route
                      path="show/:id"
                      element={<PostShow />}
                    />
                    <Route
                      path="edit/:id"
                      element={<PostEdit />}
                    />
                    <Route
                      path="create"
                      element={<PostCreate />}
                    />
                  </Route>
                </Route>
              </Routes>
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
