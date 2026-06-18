// ES module to fetch local JSON data
export async function fetchItems(){
  try{
    const res = await fetch('./data/items.json');
    if(!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    const json = await res.json();
    // expect { items: [...] }
    return json.items || json;
  }catch(err){
    console.error('fetchItems error', err);
    return [];
  }
}
