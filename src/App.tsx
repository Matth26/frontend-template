import Connection from './components/Connection';
import Read from './components/Read';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-end p-2">
        <Connection />
      </div>

      <div className="flex-grow mx-auto mt-10">
        <Read />
      </div>

      <div className="text-center py-2">Made with love by Matthias</div>
    </div>
  );
}

export default App;
