const username = "OmarMirandaDEV";

const featuredRepos = [
  {
    name: "KInalExpress_2023020",
    description: "Proyecto implementando JavaFX, MVC y JDBC.",
    url: "https://github.com/OmarMirandaDEV/KInalExpress_2023020",
    language: "Java",
    badge: "Aplicación de escritorio",
  },
  {
    name: "Proyecto_Spring_Boot",
    description: "Base para proyectos con Spring Boot y backend Java.",
    url: "https://github.com/OmarMirandaDEV/Proyecto_Spring_Boot",
    language: "Java",
    badge: "Backend",
  },
  {
    name: "BlogDeAprendizaje",
    description: "Proyecto de aprendizaje con enfoque en desarrollo web.",
    url: "https://github.com/OmarMirandaDEV/BlogDeAprendizaje",
    language: "JavaScript",
    badge: "Web",
  },
  {
    name: "AdoptionSystem-lab-2",
    description: "Sistema de adopción desarrollado como práctica académica.",
    url: "https://github.com/OmarMirandaDEV/AdoptionSystem-lab-2",
    language: "JavaScript",
    badge: "Sistema",
  },
  {
    name: "COPEREX",
    description: "Proyecto web realizado con JavaScript como parte de tu portafolio.",
    url: "https://github.com/OmarMirandaDEV/COPEREX",
    language: "JavaScript",
    badge: "Frontend",
  },
  {
    name: "Practicas_Supervisadas_Gestor_de_Opiniones",
    description: "Proyecto de gestión de opiniones y prácticas supervisadas.",
    url: "https://github.com/OmarMirandaDEV/Practicas_Supervisadas_Gestor_de_Opiniones",
    language: "JavaScript",
    badge: "Gestión",
  },
];

const featuredContainer = document.getElementById("featuredProjects");
const repoGrid = document.getElementById("repoGrid");
const repoStatus = document.getElementById("repoStatus");
const repoCount = document.getElementById("repoCount");
const latestYear = document.getElementById("latestYear");
const searchInput = document.getElementById("repoSearch");

let allRepos = [];

function renderFeaturedProjects() {
  featuredContainer.innerHTML = featuredRepos
    .map(
      (project) => `
        <article class="project-card">
          <div>
            <span class="chip">${project.badge}</span>
            <h3>${project.name}</h3>
            <p>${project.description}</p>
          </div>
          <div class="project-meta">
            <span class="chip">${project.language}</span>
            <a class="button button-secondary" href="${project.url}" target="_blank" rel="noreferrer">Ver repositorio</a>
          </div>
        </article>
      `,
    )
    .join("");
}

function formatDate(value) {
  const date = new Date(value);
  return new Intl.DateTimeFormat("es-ES", {
    month: "short",
    year: "numeric",
  }).format(date);
}

function renderRepoList(repos) {
  if (repos.length === 0) {
    repoGrid.innerHTML = '<div class="empty-state">No encontré repositorios que coincidan con esa búsqueda.</div>';
    return;
  }

  repoGrid.innerHTML = repos
    .map(
      (repo) => `
        <article class="repo-card">
          <div class="repo-card-head">
            <div>
              <h3><a href="${repo.html_url}" target="_blank" rel="noreferrer">${repo.name}</a></h3>
              <small>${repo.description || "Sin descripción pública todavía."}</small>
            </div>
            <span class="chip">${repo.language || "No definido"}</span>
          </div>
          <div class="repo-meta">
            <span class="chip">Actualizado ${formatDate(repo.updated_at)}</span>
            <span class="chip">${repo.private ? "Privado" : "Público"}</span>
          </div>
          <div class="repo-card-footer">
            <a class="button button-secondary" href="${repo.html_url}" target="_blank" rel="noreferrer">Abrir</a>
            <small>${repo.stargazers_count} estrellas</small>
          </div>
        </article>
      `,
    )
    .join("");
}

function filterRepos(query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return allRepos;
  }

  return allRepos.filter((repo) => {
    const haystack = [repo.name, repo.language, repo.description]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

function updateCounters(repos) {
  repoCount.textContent = String(repos.length);

  const latestRepo = repos.reduce((current, candidate) => {
    if (!current) {
      return candidate;
    }

    return new Date(candidate.updated_at) > new Date(current.updated_at) ? candidate : current;
  }, null);

  if (latestRepo) {
    latestYear.textContent = new Date(latestRepo.updated_at).getFullYear();
  }
}

function renderCurrentState() {
  const filtered = filterRepos(searchInput.value);
  renderRepoList(filtered);
  repoStatus.textContent = `${filtered.length} repositorios visibles de ${allRepos.length} públicos.`;
}

async function loadRepos() {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);

    if (!response.ok) {
      throw new Error(`GitHub respondió con ${response.status}`);
    }

    allRepos = await response.json();
    allRepos = allRepos.filter((repo) => !repo.fork).sort((left, right) => new Date(right.updated_at) - new Date(left.updated_at));

    updateCounters(allRepos);
    renderCurrentState();
  } catch (error) {
    repoStatus.textContent = "No pude cargar tus repositorios desde GitHub.";
    repoGrid.innerHTML = `<div class="error-state">${error.message}. Puedes volver a intentarlo recargando la página.</div>`;
  }
}

searchInput.addEventListener("input", renderCurrentState);

renderFeaturedProjects();
loadRepos();