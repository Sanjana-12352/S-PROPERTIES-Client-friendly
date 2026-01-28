// firebaseServices.js - Firebase CRUD operations for properties

import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase';

// Collection reference
const propertiesCollection = collection(db, 'properties');

// CREATE - Add a new property
export const addProperty = async (propertyData) => {
  try {
    const docRef = await addDoc(propertiesCollection, {
      ...propertyData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding property:", error);
    return { success: false, error: error.message };
  }
};

// READ - Get all properties
export const getAllProperties = async () => {
  try {
    const querySnapshot = await getDocs(propertiesCollection);
    const properties = [];
    querySnapshot.forEach((doc) => {
      properties.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: properties };
  } catch (error) {
    console.error("Error getting properties:", error);
    return { success: false, error: error.message };
  }
};

// READ - Get a single property by ID
export const getPropertyById = async (id) => {
  try {
    const docRef = doc(db, 'properties', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } };
    } else {
      return { success: false, error: "Property not found" };
    }
  } catch (error) {
    console.error("Error getting property:", error);
    return { success: false, error: error.message };
  }
};

// READ - Get properties by type
export const getPropertiesByType = async (type) => {
  try {
    const q = query(propertiesCollection, where("type", "==", type));
    const querySnapshot = await getDocs(q);
    const properties = [];
    querySnapshot.forEach((doc) => {
      properties.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: properties };
  } catch (error) {
    console.error("Error getting properties by type:", error);
    return { success: false, error: error.message };
  }
};

// READ - Get featured properties
export const getFeaturedProperties = async () => {
  try {
    const q = query(
      propertiesCollection, 
      where("featured", "==", true),
      limit(6)
    );
    const querySnapshot = await getDocs(q);
    const properties = [];
    querySnapshot.forEach((doc) => {
      properties.push({ id: doc.id, ...doc.data() });
    });
    return { success: true, data: properties };
  } catch (error) {
    console.error("Error getting featured properties:", error);
    return { success: false, error: error.message };
  }
};

// UPDATE - Update a property
export const updateProperty = async (id, updatedData) => {
  try {
    const docRef = doc(db, 'properties', id);
    await updateDoc(docRef, {
      ...updatedData,
      updatedAt: new Date().toISOString()
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating property:", error);
    return { success: false, error: error.message };
  }
};

// DELETE - Delete a property
export const deleteProperty = async (id) => {
  try {
    const docRef = doc(db, 'properties', id);
    await deleteDoc(docRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting property:", error);
    return { success: false, error: error.message };
  }
};

// STORAGE - Upload property image
export const uploadPropertyImage = async (file, propertyId) => {
  try {
    const timestamp = new Date().getTime();
    const fileName = `${propertyId}_${timestamp}_${file.name}`;
    const storageRef = ref(storage, `properties/${fileName}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return { success: true, url: downloadURL };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, error: error.message };
  }
};

// STORAGE - Delete property image
export const deletePropertyImage = async (imageUrl) => {
  try {
    const imageRef = ref(storage, imageUrl);
    await deleteObject(imageRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting image:", error);
    return { success: false, error: error.message };
  }
};

// Search properties by location or title
export const searchProperties = async (searchTerm) => {
  try {
    const allProperties = await getAllProperties();
    if (!allProperties.success) return allProperties;
    
    const filtered = allProperties.data.filter(property => 
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return { success: true, data: filtered };
  } catch (error) {
    console.error("Error searching properties:", error);
    return { success: false, error: error.message };
  }
};