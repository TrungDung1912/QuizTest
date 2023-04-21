import './App.scss';
import Header from './components/Header/Header';

const App = () => {
  return (
    <div className="app-container">
      <Header />
    </div>
  );
}

export default App;
//Hot reloading: Cập nhật trang không cần refresh
//Babel Compiler: Code được các version JS khác nhau
//Webpack: Dùng để nén code lại
//Ready for production