import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('myDatabase.db');

const getAllCollections = async () => {
    let data = [
        {
            id: 1, 
            name: 'Motivation',
            follow: true,
            type: 'movie',
            author: '',
            icon: 'book',
        },
        {
            id: 2, 
            name: 'No more Mr Nice Guy',
            follow: false,
            type: 'book',
            author: 'Dr Robert Glover',
            icon: 'movie',
        },
        {
            id: 3, 
            name: 'Love',
            follow: false,
            type: 'other',
            author: '',
            icon: 'audiotrack',
        },
        {
            id: 4, 
            name: 'Rich Dad Poor Dad',
            follow: true,
            type: 'movie',
            author: '',
            icon: 'tv',
        },
        {
            id: 5, 
            name: 'is a personal song i wrote. Share this with everyone and anyone',
            follow: true,
            type: 'book',
            author: 'Dr Robert Glover',
            icon: 'person',
        },
        {
            id: 6, 
            name: 'Love',
            follow: true,
            type: 'other',
            author: '',
            icon: 'dataset',
        },
    ];

    return data;
}

const getAllCollectionTypes = async () => {
    let data = [
        {
            id: 1,
            name: 'Book',
            icon: 'book', // use MaterialIcons
        },
        {
            id: 2,
            name: 'Movie',
            icon: 'movie', // use MaterialIcons
        },
        {
            id: 3,
            name: 'Song',
            icon: 'audiotrack', // use MaterialIcons
        },
        {
            id: 4,
            name: 'TV Series',
            icon: 'tv', // use MaterialIcons
        },
        {
            id: 4,
            name: 'Person',
            icon: 'person', // use MaterialIcons
        },
        {
            id: 5,
            name: 'Other',
            icon: 'dataset', // use MaterialIcons
        },
        
    ];

    return data;
}

// Function to delete a collection
const deleteCollection = async (id) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM collections WHERE id = ?;',
          [id],
          (_, result) => {
            console.log('Collection deleted successfully:', result);
            resolve(result);
          },
          (_, error) => {
            console.error('Error deleting collection:', error.message);
            reject(error);
          }
        );
      });
    });
};

export { getAllCollections, deleteCollection, getAllCollectionTypes }