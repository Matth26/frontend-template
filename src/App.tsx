import './App.css';
import Connection from './components/Connection';

function App() {
  return (
    <div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex justify-end">
          <Connection />
        </div>

        <div className="mx-auto"></div>

        <div>Made with love by Matthias</div>
      </div>
    </div>
  );
}

export default App;
