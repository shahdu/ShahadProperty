export const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'kbekf6c6'); 
    formData.append('folder', 'property'); 

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dndemnyvy/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }
  
      const data = await response.json();
      return data.secure_url; 
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
    }
  };