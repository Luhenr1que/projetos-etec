const meals = [
  { idMeal: 'demo-1', strMeal: 'Salada ilustrativa (salad)', strCategory: 'Vegetarian', strArea: 'Demonstração', strIngredient1: 'Alface', strMeasure1: '1 porção', strIngredient2: 'Tomate', strMeasure2: '1 unidade', strInstructions: 'Exemplo fictício: lave e misture os ingredientes. Conteúdo ilustrativo, sem recomendação nutricional.', strMealThumb: '', strYoutube: '', strSource: '' },
  { idMeal: 'demo-2', strMeal: 'Massa ilustrativa (pasta)', strCategory: 'Pasta', strArea: 'Demonstração', strIngredient1: 'Massa', strMeasure1: '1 porção', strIngredient2: 'Molho', strMeasure2: 'A gosto', strInstructions: 'Exemplo fictício: cozinhe a massa e misture o molho. Conteúdo ilustrativo.', strMealThumb: '', strYoutube: '', strSource: '' },
  { idMeal: 'demo-3', strMeal: 'Sopa ilustrativa (soup)', strCategory: 'Vegetarian', strArea: 'Demonstração', strIngredient1: 'Legumes', strMeasure1: '1 porção', strInstructions: 'Exemplo fictício: cozinhe os legumes em água. Conteúdo ilustrativo.', strMealThumb: '', strYoutube: '', strSource: '' },
];
let nextMeal = 0;
export default {
  get: async (url, options = {}) => {
    if (url.includes('frases.docapi.dev')) return { data: { resposta: [{ frase: 'Explore os recursos desta demonstração fictícia.', nomeAutor: 'Demo acadêmica' }] } };
    if (url.includes('random.php')) return { data: { meals: [meals[nextMeal++ % meals.length]] } };
    if (url.includes('search.php')) { const term = (options.params?.s || '').toLowerCase(); return { data: { meals: meals.filter(meal => meal.strMeal.toLowerCase().includes(term)) } }; }
    throw new Error('Serviço não disponível no modo fictício.');
  },
};
