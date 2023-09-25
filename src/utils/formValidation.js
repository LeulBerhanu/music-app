function formValidation(formData) {
  const errors = {};

  if (!formData.title.trim()) {
    errors.title = "Title is required";
  }

  if (!formData.artist.trim()) {
    errors.artist = "Artist is required";
  }

  if (!formData.avatar.url) {
    errors.avatar = "Avatar is required";
  }

  if (!formData.audio.url) {
    errors.audio = "Audio is required";
  }

  return errors;
}

export default formValidation;
