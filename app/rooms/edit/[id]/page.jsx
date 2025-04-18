"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import Heading from "@/components/Heading";
import updateRoom from "@/app/actions/updateRoom";
import getRoom from "@/app/actions/getRoom";
import Image from "next/image";

const EditRoomPage = () => {
    const router = useRouter();
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [formState, setFormState] = useState({
        isSubmitting: false,
        isSuccess: false,
        errorMessage: "",
    });

    const bucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ROOMS;
    const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

    useEffect(() => {
        async function fetchRoom() {
            const data = await getRoom(id);
            if (data) {
                setRoom(data);
            
            if (data.image) {
                setPreviewImage(`https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${data.image}/view?project=${projectId}`);
            } else {
                setPreviewImage("/images/no-image.jpg");
            }
            } else {
                toast.error("Room not found.");
                router.push("/");
            }
        }
        fetchRoom();
    }, [id, router]);

    useEffect(() => {
        if (formState.errorMessage) toast.error(formState.errorMessage);
        if (formState.isSuccess) {
            toast.success("Room updated successfully!");
            router.push("/rooms/my");
        }
    }, [formState, router]);

    if (!room) return <p>Loading...</p>;

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormState({ ...formState, isSubmitting: true, errorMessage: "" });

        const formData = new FormData(event.target);

        
        if (image) {
            formData.set("image", image);
        } else {
            formData.set("image", room.image); 
        }

        try {
            const response = await updateRoom(formData);
            if (response.success) {
                setFormState({
                    ...formState,
                    isSubmitting: false,
                    isSuccess: true,
                });
            } else {
                setFormState({
                    ...formState,
                    isSubmitting: false,
                    errorMessage: response.error || "Something went wrong",
                });
            }
        } catch (error) {
            setFormState({
                ...formState,
                isSubmitting: false,
                errorMessage: "An unexpected error occurred",
            });
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(file);
            setPreviewImage(URL.createObjectURL(file)); 
        }
    };

    return (
        <>
            <Heading title="Edit Room" />
            <div className="bg-primary-light shadow-lg rounded-lg p-6 w-full max-w-2xl mx-auto mt-10">
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="id" value={id} />
                    <input type="hidden" name="currentImage" value={room.image} />

                    <div className="mb-4">
                        <label htmlFor="name" className="block text-main font-bold mb-2">
                            Room Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            defaultValue={room.name}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-main font-bold mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            defaultValue={room.description}
                            className="border rounded w-full h-24 py-2 px-3"
                            required
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="sqft" className="block text-main font-bold mb-2">
                            Square Feet
                        </label>
                        <input
                            type="number"
                            id="sqft"
                            name="sqft"
                            defaultValue={room.sqft}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="capacity" className="block text-main font-bold mb-2">
                            Capacity
                        </label>
                        <input
                            type="number"
                            id="capacity"
                            name="capacity"
                            defaultValue={room.capacity}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="price_per_hour" className="block text-main font-bold mb-2">
                            Price Per Hour
                        </label>
                        <input
                            type="number"
                            id="price_per_hour"
                            name="price_per_hour"
                            defaultValue={room.price_per_hour}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="address" className="block text-main font-bold mb-2">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            defaultValue={room.address}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="location" className="block text-main font-bold mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            defaultValue={room.location}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="availability" className="block text-main font-bold mb-2">
                            Availability
                        </label>
                        <input
                            type="text"
                            id="availability"
                            name="availability"
                            defaultValue={room.availability}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="amenities" className="block text-main font-bold mb-2">
                            Amenities
                        </label>
                        <input
                            type="text"
                            id="amenities"
                            name="amenities"
                            defaultValue={room.amenities}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>

                   
                    <div className="mb-8">
                        <label htmlFor="image" className="block text-main font-bold mb-2">
                            Room Image
                        </label>
                        <Image
                            src={previewImage}
                            alt="Room Preview"
                            width={400}
                            height={400}
                            className="w-full h-48 object-cover rounded mb-2"
                        />
                        <input
                            type="file"
                            id="image"
                            name="image"
                            className="border border-4 rounded w-full py-2 px-3"
                            onChange={handleImageChange}
                        />
                    </div>

                    <div className="flex flex-col gap-5">
                        <button
                            type="submit"
                            className="bg-primary-dark text-primary px-4 py-2 rounded hover:bg-text-link-hover"
                            disabled={formState.isSubmitting}
                        >
                            {formState.isSubmitting ? "Updating..." : "Update Room"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditRoomPage;
