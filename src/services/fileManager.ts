import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";

export const useUploadFile = async (
  file: File,
  filePath: string
): Promise<string> => {
  // Create the file metadata
  const metadata = {
    contentType: file.type,
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, filePath + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  // return url when upload is complete
  return new Promise((resolve) => {
    uploadTask.on("state_changed", () => {
      if (uploadTask.snapshot.state === "success") {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // return downloadURL;
          resolve(downloadURL);
        });
      }
    });
  });
};
