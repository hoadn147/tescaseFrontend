import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes } from './routes';
import DefaultLayout from './Layout/DefaultLayout';

function App() {
  return (
    <Router>
      <div className="App" style={{ height: "100%"}}>
        <Routes>
          {publicRoutes.map((route, index) => {
            let Layout = DefaultLayout;
            const Page = route.component;

            if (route.layout) {
              Layout = route.layout;
            }

            return (
                <Route
                    key={index}
                    path={route.path}
                    element={
                        <Layout>
                            <Page />
                        </Layout>
                    }
                />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
