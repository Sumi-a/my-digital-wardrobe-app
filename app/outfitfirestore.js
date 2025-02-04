// import {
//   collection,
//   addDoc,
//   getDocs,
//   deleteDoc,
//   doc,
// } from "firebase/firestore";
// import { db } from "./firebase";

// // Add a new outfit to the outfits collection
// // export const handleCreateOutfit = async (newOutfit) => {
// //   try {
// //     const docRef = await addDoc(collection(db, "outfits"), newOutfit);
// //     console.log("Outfit created with ID:", docRef.id);
// //     return docRef.id; // Return the ID of the created document
// //   } catch (error) {
// //     console.error("Error creating outfit:", error);
// //     throw new Error("Failed to create outfit. Please try again.");
// //   }
// // };
// export const handleCreateOutfit = async (newOutfit) => {
//   try {
//     const docRef = await addDoc(collection(db, "outfits"), {
//       name: newOutfit.name || "Untitled Outfit",
//       category: newOutfit.category || "No Category",
//       top: newOutfit.top
//         ? { id: newOutfit.top.id, url: newOutfit.top.url }
//         : null,
//       bottom: newOutfit.bottom
//         ? { id: newOutfit.bottom.id, url: newOutfit.bottom.url }
//         : null,
//       createdAt: new Date().toISOString(),
//     });
//     console.log("Outfit created with ID:", docRef.id);
//     return docRef.id; // Return the ID for further use
//   } catch (error) {
//     console.error("Error creating outfit:", error);
//     throw new Error("Failed to create outfit. Please try again.");
//   }
// };

// // Fetch all outfits from the outfits collection
// export const getOutfits = async () => {
//   const outfits = [];
//   try {
//     const querySnapshot = await getDocs(collection(db, "outfits"));
//     querySnapshot.forEach((doc) => {
//       const data = doc.data();
//       outfits.push({
//         id: doc.id,
//         // top: data.topImage, // Assuming topImage has { url } field
//         // bottom: data.bottomImage,
//         top: data.top?.url,
//         bottom: data.bottom?.url,
//         name: data.name || "Untitled Outfit",
//         category: data.category || "No Category",
//       });
//     });
//   } catch (error) {
//     console.error("Error fetching outfits:", error);
//   }
//   return outfits;
// };

// export const fetchWardrobe = async () => {
//   const wardrobe = { tops: [], bottoms: [] };
//   const querySnapshot = await getDocs(collection(db, "wardrobeItems"));
//   querySnapshot.forEach((doc) => {
//     const item = { id: doc.id, ...doc.data() };
//     if (item.type === "top") wardrobe.tops.push(item);
//     if (item.type === "bottom") wardrobe.bottoms.push(item);
//   });
//   return wardrobe;
// };

// export const saveOutfit = async (outfit) => {
//   try {
//     await addDoc(collection(db, "outfits"), {
//       ...outfit,
//       createdAt: new Date().toISOString(),
//     });
//     console.log("Outfit saved successfully!");
//   } catch (error) {
//     console.error("Error saving outfit:", error);
//   }
// };

// // Delete an outfit by ID
// export const deleteOutfit = async (outfitId) => {
//   try {
//     await deleteDoc(doc(db, "outfits", outfitId));
//     console.log(`Outfit with ID: ${outfitId} has been deleted.`);
//   } catch (error) {
//     console.error("Error deleting outfit:", error);
//     throw new Error("Failed to delete outfit. Please try again.");
//   }
// };
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

// Fetch wardrobe items (tops and bottoms)
export const fetchWardrobe = async () => {
  const wardrobe = { tops: [], bottoms: [] };
  try {
    const querySnapshot = await getDocs(collection(db, "outfits")); // Fetch from "outfits" collection
    querySnapshot.forEach((doc) => {
      const item = { id: doc.id, ...doc.data() };

      // Assuming "outfits" have `top` and `bottom` fields
      if (item.top) wardrobe.tops.push(item.top);
      if (item.bottom) wardrobe.bottoms.push(item.bottom);
    });
    console.log("Wardrobe fetched:", wardrobe);
  } catch (error) {
    console.error("Error fetching wardrobe from outfits:", error);
  }
  return wardrobe;
};

export const handleCreateOutfit = async (newOutfit) => {
  try {
    const docRef = await addDoc(collection(db, "outfits"), {
      name: newOutfit.name || "Untitled Outfit",
      category: newOutfit.category || "No Category",
      top: newOutfit.top
        ? { id: newOutfit.top.id, url: newOutfit.top.url }
        : null,
      bottom: newOutfit.bottom
        ? { id: newOutfit.bottom.id, url: newOutfit.bottom.url }
        : null,
      createdAt: new Date().toISOString(),
    });
    console.log("Outfit created with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error creating outfit:", error);
    throw new Error("Failed to create outfit. Please try again.");
  }
};

// Save outfit
export const saveOutfit = async (outfit) => {
  try {
    await addDoc(collection(db, "outfits"), {
      ...outfit,
      createdAt: new Date().toISOString(),
    });
    console.log("Outfit saved successfully!");
  } catch (error) {
    console.error("Error saving outfit:", error);
    throw new Error("Failed to save outfit.");
  }
};

// Fetch all outfits
export const getOutfits = async () => {
  const outfits = [];
  try {
    const querySnapshot = await getDocs(collection(db, "outfits"));
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      outfits.push({
        id: doc.id,
        top: data.top?.url,
        bottom: data.bottom?.url,
        name: data.name || "Untitled Outfit",
        category: data.category || "No Category",
      });
    });
    console.log("Outfits fetched:", outfits);
  } catch (error) {
    console.error("Error fetching outfits:", error);
  }
  return outfits;
};
