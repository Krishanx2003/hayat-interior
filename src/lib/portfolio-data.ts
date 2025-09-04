export type Project = {
    id: string
    title: string
    category: "residential" | "commercial" | "kitchen"
    location: string
    budget: string
    duration: string
    area: string
    client: string
    year: string
    images: string[]
    description: string
    fullDescription: string
    challenges: string
    solution: string
    features: string[]
  }
  
  export const projects: Project[] = [
    {
      id: "1",
      title: "Modern Living Room",
      category: "residential",
      location: "Delhi NCR",
      budget: "₹3.5L",
      duration: "6 weeks",
      area: "1200 sq ft",
      client: "The Sharma Family",
      year: "2024",
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ],
      description: "Contemporary design with neutral tones",
      fullDescription:
        "This modern living room transformation combines contemporary aesthetics with functional design. The space features a neutral color palette with warm wood accents, creating a sophisticated yet cozy atmosphere perfect for family gatherings and entertaining guests.",
      challenges:
        "The main challenge was maximizing natural light in a north-facing room while creating distinct zones for relaxation and entertainment.",
      solution:
        "We implemented strategic mirror placement, light-colored furniture, and open shelving to create the illusion of more space and brightness.",
      features: [
        "Custom built-in entertainment unit",
        "Modular seating arrangement",
        "Smart lighting system",
        "Hidden storage solutions",
        "Premium Italian marble flooring",
        "Automated window treatments",
      ],
    },
    {
      id: "2",
      title: "Luxury Kitchen",
      category: "kitchen",
      location: "Gurugram",
      budget: "₹4.2L",
      duration: "8 weeks",
      area: "800 sq ft",
      client: "The Gupta Residence",
      year: "2024",
      images: [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ],
      description: "Modular kitchen with island design",
      fullDescription:
        "A sophisticated modular kitchen featuring a central island, premium appliances, and smart storage solutions. The design emphasizes both aesthetics and functionality, making cooking an enjoyable experience.",
      challenges:
        "Creating an efficient work triangle while incorporating the client's desire for an open kitchen concept.",
      solution:
        "We designed a functional island that serves as both prep space and casual dining area, with hidden storage and integrated appliances.",
      features: [
        "Quartz stone countertops",
        "Soft-close drawers and cabinets",
        "Built-in wine cooler",
        "Induction cooktop with downdraft",
        "Smart home integration",
        "LED accent lighting",
      ],
    },
    {
      id: "3",
      title: "Corporate Office",
      category: "commercial",
      location: "Noida",
      budget: "₹8.5L",
      duration: "12 weeks",
      area: "3000 sq ft",
      client: "TechCorp Solutions",
      year: "2024",
      images: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1497366754035-200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ],
      description: "Modern workspace design for 50+ employees",
      fullDescription:
        "A dynamic corporate office design that promotes collaboration and productivity. The space features open work areas, private meeting rooms, and recreational zones designed to enhance employee well-being.",
      challenges: "Balancing open collaboration spaces with the need for quiet, focused work areas.",
      solution:
        "We created flexible zones with movable partitions, acoustic solutions, and varied seating options to accommodate different work styles.",
      features: [
        "Open collaborative workstations",
        "Sound-proofed meeting rooms",
        "Employee recreation area",
        "Ergonomic furniture",
        "Biophilic design elements",
        "Advanced AV systems",
      ],
    },
    {
      id: "4",
      title: "Master Bedroom",
      category: "residential",
      location: "Faridabad",
      budget: "₹2.8L",
      duration: "5 weeks",
      area: "400 sq ft",
      client: "The Agarwal Family",
      year: "2024",
      images: [
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1560448204-444dcbf40d60?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1564540574859-0dfb63293365?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ],
      description: "Elegant bedroom with walk-in wardrobe",
      fullDescription:
        "A serene master bedroom retreat featuring elegant furnishing, custom storage solutions, and a luxurious walk-in wardrobe. The design emphasizes comfort and tranquility.",
      challenges: "Maximizing storage in a compact space while maintaining an elegant, uncluttered appearance.",
      solution:
        "We designed a custom walk-in wardrobe with smart organization systems and incorporated hidden storage throughout the room.",
      features: [
        "Custom walk-in wardrobe",
        "Upholstered headboard wall",
        "Ambient lighting system",
        "Built-in study nook",
        "Premium wooden flooring",
        "Blackout curtains",
      ],
    },
    {
      id: "5",
      title: "Restaurant Interior",
      category: "commercial",
      location: "Greater Noida",
      budget: "₹6.2L",
      duration: "10 weeks",
      area: "2000 sq ft",
      client: "Spice Garden Restaurant",
      year: "2024",
      images: [
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1552566353-e8a23fde2ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ],
      description: "Fine dining restaurant with ambient lighting",
      fullDescription:
        "An upscale restaurant interior that creates an intimate dining experience through careful lighting design, premium materials, and thoughtful space planning.",
      challenges:
        "Creating an intimate atmosphere while maintaining efficient service flow and accommodating various group sizes.",
      solution:
        "We designed flexible seating arrangements with strategic lighting zones and acoustic treatments to enhance the dining experience.",
      features: [
        "Custom lighting design",
        "Acoustic ceiling treatment",
        "Live kitchen display",
        "Premium upholstery",
        "Natural stone accents",
        "Private dining areas",
      ],
    },
    {
      id: "6",
      title: "Compact Kitchen",
      category: "kitchen",
      location: "Delhi NCR",
      budget: "₹2.5L",
      duration: "4 weeks",
      area: "300 sq ft",
      client: "Urban Apartment",
      year: "2024",
      images: [
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1556909114-9f8b4c1c29a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      ],
      description: "Space-efficient design for small apartments",
      fullDescription:
        "A cleverly designed compact kitchen that maximizes every inch of space without compromising on functionality or style. Perfect for modern urban living.",
      challenges: "Fitting all essential kitchen elements into a very limited space while maintaining good workflow.",
      solution:
        "We utilized vertical space, multi-functional elements, and clever storage solutions to create a fully functional kitchen.",
      features: [
        "Vertical storage solutions",
        "Pull-out pantry units",
        "Compact appliances",
        "Fold-down breakfast counter",
        "Under-cabinet lighting",
        "Space-saving hardware",
      ],
    },
  ]
  
  export const categories = [
    { id: "all", name: "All Projects" },
    { id: "residential", name: "Residential" },
    { id: "commercial", name: "Commercial" },
    { id: "kitchen", name: "Kitchens" },
  ] as const
  