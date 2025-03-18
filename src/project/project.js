import "./project.css";
import { ProjectCard } from "./projectCard";
import { useState } from "react";
import projects from "./projects.js";

export function Project() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleChange = (e) => {
    setSelectedCategory(e.target.innerText);
  };

  const filteredProjects =
  selectedCategory === "All"
    ? projects // ✅ Correct: `projects` is an array
    : projects.filter((pro) => pro.category === selectedCategory);

  return (
    <div className="project">
      <div className="project-header">
        <h1>Our Projects <p>Home / Project</p></h1>
      </div>
      <div className="project-categories">
        <ul>
          <ol className="p-ctg notakenCategory" onClick={handleChange}>All</ol>
          <ol className="p-ctg notakenCategory" onClick={handleChange}>Bedroom</ol>
          <ol className="p-ctg notakenCategory" onClick={handleChange}>TV unit</ol>
          <ol className="p-ctg notakenCategory" onClick={handleChange}>Kitchen</ol>
          <ol className="p-ctg notakenCategory" onClick={handleChange}>Dining Room</ol>
        </ul>
      </div>
      <div className="our-projects">
        { (
          filteredProjects.map((pro, ind) => <ProjectCard props={pro} key={ind} />)
        )}
      </div>
    </div>
  );
}
