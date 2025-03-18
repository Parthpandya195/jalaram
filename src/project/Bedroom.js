import { ProjectCard } from "./projectCard";
import projects from "./projects.js";

export function Bedroom() {
  // Filter projects for the Bedroom category
  const bedroomProjects = projects.projects.filter(
    (project) => project.category === "Bedroom"
  );

  return (
    <div className="our-projects">
      {bedroomProjects.length > 0 ? (
        bedroomProjects.map((pro, ind) => <ProjectCard props={pro} key={ind} />)
      ) : (
        <p>No bedroom projects available.</p>
      )}
    </div>
  );
}
