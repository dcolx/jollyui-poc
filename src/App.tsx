import { Button } from './components/button';
import { Input } from './components/input';
import './App.css';
import { ReusableCombobox } from './components/multi-select';
import React from 'react';

const ITEMS: React.ComponentProps<typeof ReusableCombobox>["items"] = [
  { id: "1", label: "EcoFriendly Initiative" },
  { id: "2", label: "Tech Innovators Program" },
  { id: "3", label: "Health & Wellness Campaign" },
  // { id: "4", label: "Sustainable Living Project" },
  // { id: "5", label: "Youth Empowerment Drive" },
  // { id: "6", label: "Global Outreach Program" },
  // { id: "7", label: "Digital Transformation Initiative" },
  // { id: "8", label: "Community Builders Network" },
  // { id: "9", label: "Green Energy Solutions" },
  // { id: "10", label: "Smart Cities Project" },
  // { id: "11", label: "Cultural Heritage Preservation" },
  // { id: "12", label: "Innovative Education Program" },
  // { id: "13", label: "Healthy Lifestyle Campaign" },
  // { id: "14", label: "Tech for Good Initiative" },
  // { id: "15", label: "Art & Creativity Drive" },
  // { id: "16", label: "Inclusive Society Program" },
  // { id: "17", label: "Future Leaders Initiative" },
  // { id: "18", label: "Sustainable Agriculture Project" },
  // { id: "19", label: "Digital Literacy Campaign" },
  // { id: "20", label: "Global Health Initiative" },
  // { id: "21", label: "Smart Home Solutions" },
  // { id: "22", label: "Civic Engagement Program" },
  // { id: "23", label: "Tech Startups Accelerator" },
  // { id: "24", label: "Environmental Awareness Drive" },
  // { id: "25", label: "Cultural Exchange Program" },
  // { id: "26", label: "Women in Tech Initiative" },
  // { id: "27", label: "Renewable Energy Campaign" },
  // { id: "28", label: "Urban Development Project" },
  // { id: "29", label: "Mental Health Awareness" },
  // { id: "30", label: "Global Innovation Network" },
];

function App() {
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  return (
    <main>
      <section>
        <h1>Combobox</h1>
        <ReusableCombobox
          // intent="secondary"
          // size="small"
          // onSelectionChange={(i) => alert(i)}
          placeholder={"Select a make"}
          // intent={"primary"}
          items={ITEMS}
          selectedIds={selectedIds}
          onItemChange={setSelectedIds}
          onChange={() => {
            console.log("🚀 Ronaldo ~ FiltersDesktop ~ onChange:");
          }}
        >
          {/* <ComboboxSection> */}
            {/* <ComboboxLabel separator>Animals section 1</ComboboxLabel> */}
            {/* <ComboboxItem textValue="Cat" id="cat-id">
              Cat
            </ComboboxItem>
            <ComboboxItem textValue="Dog" id="dog-id">
              Dog
            </ComboboxItem>
            <ComboboxItem textValue="Kangaroo" id="kangaroo-id">
              Kangaroo
            </ComboboxItem> */}
          {/* </ComboboxSection> */}
          {/* <ComboboxSection> */}
            {/* <ComboboxLabel separator>Animals section 2</ComboboxLabel> */}
            {/* <ComboboxItem textValue="Panda" id="panda-id">
              Panda
            </ComboboxItem>
            <ComboboxItem textValue="Snake" id="snake-id">
              Snake
            </ComboboxItem> */}
          {/* </ComboboxSection> */}
        </ReusableCombobox>
    
        <hr className='bg-slate-600' />
        <p className='bg-red-600'>
          <input type='text' />
          <input type='text' />
          <input type='text' />
          <input type='text' />
        </p>
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
