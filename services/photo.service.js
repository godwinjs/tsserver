/* internal import */
const remove = require("../utils/remove.util");

/* remove image from cloudinary */
async function removePhoto(public_id) {
  await remove(public_id);
}

/* export cloudinary remover */
module.exports = removePhoto;
