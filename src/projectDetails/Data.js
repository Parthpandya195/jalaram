const projectsData = [
    {
      id: 1,
      client_name: "John Doe",
      category: "Interiors",
      tags: ["Interior", "Home"],
      date: "23.02.2023",
      link: "https://example.com",
      title: "Minimal Look Bedrooms",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sem vitae turpis dignissim maximus. Aliquam sollicitudin tellus massa, vel maximus purus posuere in. Praesent at nibh in mi fringilla mattis.",
      image: require("../images/zoomImg.png"), // Ensure image path is correct
    },
    {
      id: 2,
      client_name: "Jane Smith",
      category: "Architecture",
      tags: ["Modern", "Design"],
      date: "15.05.2023",
      link: "https://example.com/project2",
      title: "Modern Office Spaces",
      description:
        "An example of modern office architecture with sustainable and innovative design concepts.",
      image: require("../photos/home/Balcony/pexels-donaldtong94-133920.jpg"),
    },
  ];
  
  export default projectsData;
  