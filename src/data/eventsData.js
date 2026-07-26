export const slugify = (text) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const rawUpcomingEvents = [
  {
    title: "Seminar on EcoVadis",
    category: "SEMINAR",
    date: "2026-09-15",
    description: "An informative seminar focusing on EcoVadis ratings, sustainability assessments, and corporate social responsibility methodologies.",
    image: "/building.jpg",
    location: "Dhanbad",
    price: "Free",
    speaker: "EcoVadis Rep"
  }
];

const rawPastEvents = [
  {
    title: "Alumni Meet",
    category: "NETWORKING",
    date: "2026-02-10",
    description: "Our annual gathering where current students and faculty meet our esteemed alumni to discuss career paths and industry trends.",
    image: "/building.jpg",
    location: "Virtual",
    price: "Free",
    speaker: "Various Alumni"
  },
  {
    title: "Workshop 1",
    category: "WORKSHOP",
    date: "2026-03-05",
    description: "A hands-on workshop focused on environmental data analysis and fieldwork techniques.",
    image: "/nature_square.png",
    location: "Dhanbad",
    price: "Free",
    speaker: "Dr. Field"
  },
  {
    title: "Workshop 2",
    category: "WORKSHOP",
    date: "2026-04-15",
    description: "Advanced techniques in sustainable engineering and practical applications of green tech.",
    image: "/building.jpg",
    location: "Dhanbad",
    price: "Free",
    speaker: "Prof. Green"
  }
];

export const upcomingEvents = rawUpcomingEvents.map(evt => ({ ...evt, id: slugify(evt.title) }));
export const pastEvents = rawPastEvents.map(evt => ({ ...evt, id: slugify(evt.title) }));
export const allEvents = [...upcomingEvents, ...pastEvents];

export const getEventById = (id) => {
  return allEvents.find(evt => evt.id === id);
};
