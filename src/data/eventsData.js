export const slugify = (text) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const rawUpcomingEvents = [
  {
    title: "Annual Sustainability Summit",
    category: "BUSINESS",
    date: "2026-10-15",
    description: "Join industry leaders to discuss the future of sustainable engineering and environmental practices.",
    image: "/building.jpg",
    location: "Dhanbad",
    price: "Free",
    speaker: "Dr. Smith"
  },
  {
    title: "Alumni Connect 2026",
    category: "TECHNOLOGY",
    date: "2026-11-02",
    description: "Interact with successful alumni from our department and learn from their industry experiences.",
    image: "/building.jpg",
    location: "Virtual",
    price: "Free",
    speaker: "Jane Doe"
  },
  {
    title: "Winter Plantation Drive",
    category: "ENVIRONMENT",
    date: "2026-12-10",
    description: "Join us in planting over 1,000 trees across the city to combat air pollution.",
    image: "/nature_square.png",
    location: "City Park",
    price: "Free",
    speaker: "Prof. Allen"
  }
];

const rawPastEvents = [
  {
    title: "Art Gallery Open",
    category: "ART",
    date: "2026-04-05",
    description: "Join us for the grand opening of the new modern art gallery. Environmental art displays.",
    image: "/building.jpg",
    location: "Paris",
    price: "Free",
    speaker: "Showing"
  },
  {
    title: "Street Food Festival",
    category: "FOOD",
    date: "2026-05-20",
    description: "Experience the best street food from around the world.",
    image: "/building.jpg",
    location: "New York",
    price: "$15",
    speaker: "Showing"
  },
  {
    title: "AI in Environment",
    category: "TECHNOLOGY",
    date: "2026-06-10",
    description: "Discussing the role of Artificial Intelligence in tracking and managing environmental changes.",
    image: "/building.jpg",
    location: "Berlin",
    price: "$50",
    speaker: "Showing"
  },
  {
    title: "Green Energy Expo",
    category: "BUSINESS",
    date: "2026-07-22",
    description: "An expo showcasing the latest innovations in renewable and green energy sources.",
    image: "/nature_square.png",
    location: "Tokyo",
    price: "$120",
    speaker: "Showing"
  },
  {
    title: "Sustainable Architecture",
    category: "EDUCATION",
    date: "2026-08-15",
    description: "A seminar on designing buildings that are environmentally friendly and sustainable.",
    image: "/building.jpg",
    location: "Sydney",
    price: "$80",
    speaker: "Showing"
  }
];

export const upcomingEvents = rawUpcomingEvents.map(evt => ({ ...evt, id: slugify(evt.title) }));
export const pastEvents = rawPastEvents.map(evt => ({ ...evt, id: slugify(evt.title) }));
export const allEvents = [...upcomingEvents, ...pastEvents];

export const getEventById = (id) => {
  return allEvents.find(evt => evt.id === id);
};
