import React from 'react';
import { Button } from './components/button';
import { Input } from './components/input';
import './App.css';
import { ReusableCombobox, ComboboxSection, ComboboxLabel, ComboboxItem } from './components/multi-select';

function App() {
  return (
    <main>
      <section>
        <h1>Combobox</h1>
        <ReusableCombobox
          intent="secondary"
          size="small"
          placeholder="Select an animal..."
          // onSelectionChange={(i) => alert(i)}
        >
          <ComboboxSection>
            <ComboboxLabel separator>Animals section 1</ComboboxLabel>
            <ComboboxItem textValue="Cat" id="cat-id">
              Cat
            </ComboboxItem>
            <ComboboxItem textValue="Dog" id="dog-id">
              Dog
            </ComboboxItem>
            <ComboboxItem textValue="Kangaroo" id="kangaroo-id">
              Kangaroo
            </ComboboxItem>
          </ComboboxSection>
          <ComboboxSection>
            <ComboboxLabel separator>Animals section 2</ComboboxLabel>
            <ComboboxItem textValue="Panda" id="panda-id">
              Panda
            </ComboboxItem>
            <ComboboxItem textValue="Snake" id="snake-id">
              Snake
            </ComboboxItem>
          </ComboboxSection>
        </ReusableCombobox>
      </section>

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
