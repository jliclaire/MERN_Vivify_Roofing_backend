const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: "dn8lparwq",
  api_key: "441492522748252",
  api_secret: "GV_jaI8tkzb3dpgiSa_JLd8wa9A"
})

// middleware file buffer to upload photo files
const uploadFile = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload_stream({ resource_type: 'raw' },
      (err, response) => {
        if (err) {
          reject(err)
        } else {
          resolve(response)
        }
      }
    ).end(fileBuffer);
  })
}

module.exports = {uploadFile}