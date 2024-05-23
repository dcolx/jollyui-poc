import { Button } from './components/button';
import { Input } from './components/input';
import './App.css';

function App() {
  return (
    <main>
      <section>
        <h1>Input examples</h1>
        <p className="py-1">
          <Input type="number" inputMode='numeric' list="prices" min="0" max="100" />
          <datalist id="prices">
            <option value="0"></option>
            <option value="10"></option>
            <option value="100"></option>
            <option value="1000"></option>
            <option value="20"></option>
            <option value="200"></option>
            <option value="2000"></option>
            <option value="30"></option>
            <option value="300"></option>
            <option value="3000"></option>
          </datalist>
        </p>
      </section>
      <section className="py-2">
        <h1>Button examples</h1>
        <p className="py-1">
          <Button variant="default">Default</Button>
        </p>
        <p className="py-1">
          <Button variant="destructive">Destructive</Button>
        </p>
        <p className="py-1">
          <Button variant="outline">Outline</Button>
        </p>
        <p className="py-1">
          <Button variant="secondary">Secondary</Button>
        </p>
        <p className="py-1">
          <Button variant="ghost">Ghost</Button>
        </p>
        <p className="py-1">
          <Button variant="link">Link</Button>
        </p>
      </section>
    </main>
  );
}

export default App;
