"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signOut, useSession } from "next-auth/react";
import { TrashIcon } from "lucide-react";

interface Profile {
    _id: string;
    name: string;
    avatar: string;
}

export default function ProfilePage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [name, setName] = useState("");

    const [avatar, setAvatar] = useState("");

    const [imageFile, setImageFile] = useState<File | null>(null);

    const [preview, setPreview] = useState("");
    const { update } = useSession();

    const [isDeleting, setIsDeleting] = useState(false);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const deleteAccount = async () => {
        try {
            setIsDeleting(true);

            const response = await fetch("/api/deleteUser", {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message);
                return;
            }

            toast.success(data.message);

            await signOut({
                callbackUrl: "/",
            });
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsDeleting(false);
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("/api/updateProfile");

                const data = await response.json();

                if (!response.ok) {
                    toast.error(data.message);
                    return;
                }

                const profile: Profile = data.data;

                setName(profile.name);
                setAvatar(profile.avatar);
                setPreview(profile.avatar);
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch profile.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setImageFile(file);

        setPreview(URL.createObjectURL(file));
    };

    const updateProfile = async () => {
        try {
            setSaving(true);

            const formData = new FormData();

            if (!name || name == "") {
                toast.error("Enter your Name");
                return;
            }

            formData.append("name", name);

            if (imageFile) {
                formData.append("avatar", imageFile);
            }

            const response = await fetch("/api/updateProfile", {
                method: "PATCH",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message);
                return;
            }

            toast.success(data.message);

            await update({
                name: data.data.name,
                image: data.data.avatar,
            });

            if (data.data.avatar) {
                setAvatar(data.data.avatar);
                setPreview(data.data.avatar);
            }
        } catch (error) {
            console.error(error);

            toast.error("Something went wrong.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[70vh] items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="w-screen min-h-screen bg-lime-100">
            <div className="mx-auto max-w-xl p-6 ">
                <div className="rounded-xl border bg-white p-8 shadow-lg">
                    <h1 className="mb-8 text-3xl font-bold">Profile</h1>

                    <div className="flex flex-col items-center gap-6">
                        <Image
                            src={preview || "/default-avatar.png"}
                            alt="Avatar"
                            width={140}
                            height={140}
                            className="rounded-full border object-cover"
                        />

                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                        />

                        <div className="w-full space-y-2">
                            <Label>Name</Label>

                            <Input
                                className="
        h-11
        rounded-lg
        border-zinc-300
        focus-visible:ring-1
        focus-visible:ring-zinc-400
        focus-visible:border-zinc-400
        aria-invalid:ring-0
aria-invalid:border-red-400
    
    "

                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="w-full space-y-2">
                            <Label>Current Avatar URL</Label>

                            <Input value={avatar} disabled />
                        </div>

                        <Button
                            className="w-fit px-8 py-6 bg-zinc-600 text-white"
                            disabled={saving}
                            onClick={updateProfile}
                        >
                            {saving ? "Updating..." : "Update Profile"}
                        </Button>

                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => setShowDeleteDialog(true)}
                            className={
                                "self-end border-2 border-red-800 bg-red-200"
                            }
                        >
                            <TrashIcon className="mr-2 h-4 w-4" />
                            {"Delete Account"}
                        </Button>
                    </div>
                </div>
            </div>

            {showDeleteDialog && (
                <div className="fixed w-screen h-screen bg-black/40 inset-0 flex justify-center items-center ">
                    <div className="bg-white px-8 py-8 rounded-lg flex flex-col gap-10 items-start">
                        <h1>
                            Are you sure want to delete your account <br /> This
                            can't be undone
                        </h1>
                        <div className="flex justify-end gap-6">
                            <Button
                                onClick={() => setShowDeleteDialog(false)}
                                variant="destructive"
                                size="sm"
                                className={"border-1 border-black p-4"}
                            >
                                Cancel
                            </Button>

                            <Button
                                variant="destructive"
                                size="sm"
                                disabled={isDeleting}
                                onClick={deleteAccount}
                                className={
                                    "self-end border-2 border-red-800 bg-red-200"
                                }
                            >
                                <TrashIcon className="mr-2 h-4 w-4" />
                                {isDeleting ? "Deleting..." : "Delete Account"}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
