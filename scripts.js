fetch('cv-contents.json')
  .then(response => response.json())
  .then(data => {
    const workExperienceContainer = document.getElementById('workExperienceContainer');
    const researchContainer = document.getElementById('researchContainer');
    const educationContainer = document.getElementById('educationContainer');

    // Populate Work Experience
    data.workExperience.forEach(experience => {
      const position = experience.position;
      const date = experience.date;
      const description = experience.description;

      const experienceHTML = `
        <h5 class="w3-opacity"><b>${position}</b></h5>
        <h6 style="color:#298CA7;">${date}</h6>
        <p>${description}</p>
      `;

      workExperienceContainer.innerHTML += experienceHTML;
    });

    // Populate Research
    data.research.forEach(research => {
      const link = research.link;
      const title = research.title;
      const description = research.description;

      const researchHTML = `
        <a href="${link}" style="text-decoration: none; color: #49a8c2;">${title}</a><br>
        ${description}<br><br>
      `;

      researchContainer.innerHTML += researchHTML;
    });

    // Populate Education
    data.education.forEach(education => {
      const degree = education.degree;
      const university = education.university;
      const date = education.date;
      const description = education.description;

      const educationHTML = `
        <h5 class="w3-opacity"><b>${degree} | ${university}</b></h5>
        <h6 style="color:#298CA7;">${date}</h6>
        <p>${description}</p>
        <br>
      `;

      educationContainer.innerHTML += educationHTML;
    });
  });

fetch('contact-card.json')
  .then(response => response.json())
  .then(data => {
    const contactCardContainer = document.getElementById('contactCardContainer');

    const contactCardHTML = `
      <div style="border-bottom: 1px solid grey;">
        ${data.organization}<br><br>
        ${data.address}<br>
      </div><br>
      <div>
        <a href="mailto:${data.email}" style="text-decoration: none;"><i class="fa fa-envelope w3-hover-opacity"></i> ${data.email}</a><br>
        <a href="${data.github}" style="text-decoration: none;"><i class="fa fa-github w3-hover-opacity"></i> Github</a><br>
        <a href="${data.twitter}" style="text-decoration: none;"><i class="fa fa-twitter w3-hover-opacity"></i> Twitter</a><br>
        <a href="${data.linkedin}" style="text-decoration: none;"><i class="fa fa-linkedin w3-hover-opacity"></i> LinkedIn</a><br>
        <a href="${data.researchgate}" style="text-decoration: none;"><i class="fa fa-book w3-hover-opacity"></i> ResearchGate</a>
      </div>
    `;

    contactCardContainer.innerHTML = contactCardHTML;
    document.getElementById('offcanvas-title').innerText = data.name;
  });
