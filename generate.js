const faker = require('faker');
const fs = require('fs');

faker.locale = 'vi';

const randomCategory = (n) => {
  if (n <= 0) return [];
  const randomList = [];

  Array.from(new Array(n)).forEach(() => {
    randomList.push({
      id: faker.datatype.uuid(),
      name: faker.commerce.department(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  });

  return randomList;
};

const randomPhoto = (categoryList, photoListlength) => {
  if (photoListlength <= 0) return [];
  const photoList = [];

  for (const category of categoryList) {
    Array.from(new Array(photoListlength)).forEach(() => {
      photoList.push({
        id: faker.datatype.uuid(),
        categoryId: category.id,
        title: faker.lorem.sentence(),
        imgUrl: faker.image.imageUrl(300, 300),
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    });
  }
  return photoList;
};

(() => {
  const categoryList = randomCategory(4);
  const photoList = randomPhoto(categoryList, 5);

  const db = {
    categories: categoryList,
    photos: photoList,
    profile: {
      name: 'Quan',
    },
  };

  fs.writeFile('./db.json', JSON.stringify(db), () => {
    console.log('Generate data successfully');
  });
})();
