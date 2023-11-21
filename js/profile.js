document.addEventListener('DOMContentLoaded', function () {
  const profileSection = document.getElementById('profile-section');
  const editSection = document.getElementById('edit-section');
  const editForm = document.getElementById('edit-form');
  const editProfileBtn = document.getElementById('edit-profile-btn');

  editProfileBtn.addEventListener('click', function () {
      profileSection.style.display = 'none';
      editSection.style.display = 'block';
  });

  editForm.addEventListener('submit', function (event) {
      event.preventDefault();

      // Get values from the form
      const newUsername = document.getElementById('new-username').value;
      const newBio = document.getElementById('new-bio').value;
      const newProfilePicture = document.getElementById('new-profile-picture').value;

      // Update the profile information
      document.getElementById('username').textContent = newUsername;
      document.getElementById('bio').textContent = newBio;
      document.getElementById('profile-picture').src = newProfilePicture;

      // Switch back to the profile view
      profileSection.style.display = 'flex';
      editSection.style.display = 'none';
  });
});