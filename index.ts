const grid = document.getElementById("motorcycle-grid") as HTMLElement;
// 7
const results = document.getElementById("results-number") as HTMLElement;
// 8
const input = document.getElementById("name-filter-input") as HTMLInputElement;

// 1
type Category = 'Sport' | 'Cruiser' | 'Touring' | 'Dirt' | 'Adventure' | 'Naked' | 'Electric';

// 2
interface Motorcycle {
  id: string;
  name: string;
  manufacturer: string;
  category: Category;
  price: number;
  image_url: string;
  created_at: Date;
  description: string;
  year: number;
}

// 3
const fetchMotorcycles = async (): Promise<Motorcycle[] | undefined> => {
  // 4
  try {
    const data = await fetch("https://cdn.freecodecamp.org/curriculum/labs/data/motorcycles.json")
    
    return data.json();
  } catch(err) {
    console.log(err);
  }
  
}

// 5
function renderMotorcycleCard (motorcycle: Motorcycle): string {
  return `
  <div>
    <img class="motorcycle-card-image-container" src="${motorcycle.image_url}" />
    <p class="motorcycle-card-year-badge">${motorcycle.year}</p>
    <p class="motorcycle-card-title">${motorcycle.name}</p>
    <p class="motorcycle-card-manufacturer">${motorcycle.manufacturer}</p>
    <p class="motorcycle-card-category">${motorcycle.category}</p>
    <p class="motorcycle-card-description">${motorcycle.description}</p>
    <p class="motorcycle-card-price">${motorcycle.price}</p>
    <p class="motorcycle-card-engine">${motorcycle.category}</p>
  </div>
  `;
}

class MotorcycleGalleryApp {
  private allMotorcycles: Motorcycle[];

  constructor (arr: Motorcycle[]) {
    this.allMotorcycles = arr || [];
  }

  renderMotorcycles(motorcycles: Motorcycle[] = this.allMotorcycles): void {
    motorcycles.forEach(m => {
      const mCard = document.createElement("div");
      mCard.innerHTML = renderMotorcycleCard(m);
      grid.appendChild(mCard)
    })
    // grid.innerHTML = motorcycles.map(m => renderMotorcycleCard(m)).join("");
    results.innerHTML = String(motorcycles.length);
  }

  filterByName(term: string) {
    const filtered = this.allMotorcycles.filter(m => m.name.toLowerCase().includes(term))
    this.renderMotorcycles(filtered);
  }
}

let app: MotorcycleGalleryApp;

fetchMotorcycles().then(data => {
  if (data) {
    app = new MotorcycleGalleryApp(data);
    app.renderMotorcycles()
  }
});

input.oninput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const cleanTerm = target.value.toLowerCase().trim();

  app.filterByName(cleanTerm);
}
