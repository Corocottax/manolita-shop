const cloudinary = require("cloudinary").v2;

const deleteFile = (imgUrl) => {

    //! el public id es la carpeta donde se encuentra la imagen, seguida por una barra y el nombre del archivo sin su extensión.

    //? https://res.cloudinary.com/dfwabtglr/image/upload/v1686060316/manolitaShop/qmbnf1lon8tdtjq5dqbn.jpg

    const imgSplited = imgUrl.split("/");
    const nameSplited = imgSplited.at(-1).split(".");
    const folderSplited = imgSplited.at(-2);
    const public_id = `${folderSplited}/${nameSplited[0]}`;

    cloudinary.uploader.destroy(public_id, () => {
        console.log("imagen eliminada");
    })

};

module.exports = { deleteFile }