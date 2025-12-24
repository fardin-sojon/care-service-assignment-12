import axios from 'axios';

export const imageUpload = async (image) => {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    try {
        const { data } = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
        );
        return data.display_url || data.url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error.response?.data || error.message);
        throw new Error(`Image upload failed: ${error.response?.data?.error?.message || error.message}`);
    }
};
